import express from "express"
import { config } from "dotenv"
import bodyParser from "body-parser"
import { initializeApp } from "firebase/app"
import { 
    getFirestore,
    collection, 
    addDoc,
    getDocs,
    query, 
    where,
    updateDoc,
    arrayUnion,
    doc,
    getDoc,
    setDoc,
    arrayRemove,
    runTransaction,
    clearIndexedDbPersistence
 } from "firebase/firestore"
 import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword, 

} from "firebase/auth";

import { 
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
 } from "firebase/storage";

import admin from 'firebase-admin'
import {serviceAccount,firebaseCfg} from "./cfg/config.js"
import cookieParser from "cookie-parser"
import multer from "multer"
import {v4} from "uuid"
const upload=multer()

const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
config()
app.use(cookieParser())

const port=process.env.PORT

const FBapp=initializeApp(firebaseCfg)
const db=getFirestore(FBapp)
const auth=getAuth()
const storage = getStorage()
var activeUid=undefined

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: firebaseCfg.storageBucket,
});

app.listen(port,()=>{
    try{
        console.log(`Server running on port ${port}`)
    }catch(e){
        console.log(e.message)
    }
})

const verifyToken = async (req, res, next) => {
    try {
        const idToken = req.cookies.__session || '';
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        activeUid=decodedToken.user_id
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};
app.get('/',async(req,res)=>{
    try{
        res.send('Succesfully hit Plant Buddy Servers :3')
    }catch(e){
        res.send('Error hitting the server')
    }
})
app.get('/getPlants',async (req,res)=>{
    try{
        const data=await getDocs(collection(db,'plants'))
        var result=[]
        await data.forEach((dt)=>{
            result.push({Id:dt.id,Data:dt.data()})
        })
        //await console.log(result)
        // console.log(result)
        res.send(result)
    }catch(e){
        res.send(e.message)
    }
})

app.post('/addPlant',upload.array('file'),verifyToken,async(req,res)=>{
    try{
        const data=req.body
        const ctg=data.ctg
        const files=req.files
        var urls=[]
        data.img=[]
        const docRef=await addDoc(collection(db,'plants'),data)
        await files.forEach(async (file,i)=>{
            const imageRef=ref(storage,`plants/${docRef.id}/${i}_${v4()}.jpg`)
            const metadata={
                contentType:'images/jpg',
                customMetadata: {
                  uploadedBy: req.user.email,
                  uploadDate: new Date().toISOString()
                }
            }
            const result=await uploadBytes(imageRef,file.buffer,metadata)
            const url=await getDownloadURL(result.ref)
            await updateDoc(docRef,{
                img:arrayUnion(url)
            })
        })
        const getres=await getDoc(doc(db,'categories',ctg))
        if(!getres.exists()){
            await setDoc(doc(db,'categories',ctg),{plants:[{id:docRef.id,name:data.name}]})
        }
        else{
            await updateDoc(doc(db,'categories',ctg),{
                plants:arrayUnion({id:docRef.id,name:data.name})
            })
        }
        res.send(`Plant added!`)

    }catch(e){
        console.log(e)
        res.send('Issue Adding the plant.')
    }
})

app.post('/signUpUser',async (req,res)=>{
    try{
        const {name,email,password}=req.body
        const userCred=await createUserWithEmailAndPassword(auth,email,password)
        const idToken = await userCred.user.getIdToken();
        await addDoc(collection(db,'users'),{
                email:email,
                uid:userCred.user.uid,
                name:name,addrs:[null],
                paymt:[null],
                wish:[null],
                cart:[null],
                number:''
            })
        console.log(req.body)
        res.cookie('__session', idToken,{ maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).send('User signed up');
    }catch(e){
        res.status(400)
        res.send(e.message)
    }
})
app.get('/signOutUser',async(req,res)=>{
    try{
        res.clearCookie('__session');
        await signOut(auth);
        res.send('Logged Out');
    }catch(e){
        res.send('Error signing Out')
    }
})
app.post('/loginUser',async(req,res)=>{
    try{
        const {email,password}=req.body
        const userCred=await signInWithEmailAndPassword(auth, email, password)
        const idToken = await userCred.user.getIdToken();
        res.cookie('__session', idToken,{ maxAge: 24 * 60 * 60 * 1000 });
        res.send('Successfully logged in');
    }catch(e){
        console.log(e.message)
        res.status(400)
        res.send(e.message)
    }
})

app.get('/userData',verifyToken,async(req,res)=>{
    try{
        var temp=[]
        const q=query(collection(db,'users'),where('uid','==',activeUid))
        const query_result=await getDocs(q)
        query_result.forEach((doc) => {
            temp.push({
                ...doc.data()
            });
        })
        res.status(200).json(temp[0])
    }catch(e){
        console.log(e.message)
        res.status(400)
        res.send(e.message)
    }
})

app.post('/postFiles',upload.array('file'),async (req,res)=>{
    try{
        console.dir(req.files)
    }catch(e){
        console.log(e)
        res.status(400).send(e.message)
    }
})

app.post('/getPlant',async(req,res)=>{
    try{
        const docRef=await getDoc(doc(db,'plants',req.body.id))
        res.status(200).send({Id:req.body.id,Data:docRef.data()})
    }catch(error){
        console.log(error.message)
        res.send(error.message).status(400)
    }
})

app.post('/updateCart',verifyToken,async(req,res)=>{
    try{
        var temp=[]
        let userDocId = null;
        const q=query(collection(db,'users'),where('uid','==',activeUid))
        const query_result=await getDocs(q)
        query_result.forEach((doc) => {
            temp.push({
                ...doc.data()
            });
            userDocId = doc.id;  
        })
        const cart=temp[0].cart
        const aI=(req.body)
        const userDocRef = doc(db, 'users', userDocId);
        var flag=-1
        console.log(aI)
        await runTransaction(db,async(transaction)=>{
            if(cart.items[0]!=null){
                await cart.items.forEach((item,index)=>{
                    if(item!=null&&item.id==aI.id){
                        flag=index
                        console.log('there was a match')
                    }
                })
                if(flag>-1){
                    if(aI.type==='add'){
                        console.log("Item exists")
                        var calc_val=parseFloat(Number(cart['value'])+Number(aI.qty*aI.price)).toFixed(2)
                        const update_qt=Number(cart.items[flag].qty)+Number(aI.qty)
                        await transaction.update(userDocRef,{
                            'cart.items':arrayRemove(cart.items[flag])
                        })
                        await transaction.update(userDocRef,
                            {
                                'cart.items':arrayUnion({
                                id:aI.id,
                                name:aI.name,
                                price:aI.price,
                                qty:Number(update_qt),
                                img:aI.img
                                }),
                                'cart.value':Number(calc_val)
                            }
                        )
                    }else{
                        var calc_val=Number(cart['value'])
                        const update_qt=Number(cart.items[flag].qty)-Number(aI.qty)
                        if(update_qt<1){
                            calc_val=parseFloat(Number(calc_val-(cart.items[flag].qty*cart.items[flag].price))).toFixed(2)
                            await transaction.update(userDocRef,
                                {
                                    'cart.items':arrayRemove(cart.items[flag]),
                                    'cart.value':Number(calc_val)
                                }
                            )
                        }
                        else{
                            calc_val=parseFloat(calc_val-(aI.qty*Number(aI.price))).toFixed(2)
                            console.log(cart['value'])
                            await transaction.update(userDocRef,{
                                    'cart.items':arrayRemove(cart.items[flag]),
                                    'cart.value':Number(calc_val)
                                })
                            await transaction.update(userDocRef,{
                                'cart.items':arrayUnion({
                                 id:aI.id,
                                 name:aI.name,
                                 price:aI.price,
                                 qty:update_qt,
                                 img:aI.img
                                 }),
                                 'cart.value':Number(calc_val)
                             })
                        }
                    }
                }
                else{
                    var calc_val=parseFloat(Number(cart['value'])+Number(aI.qty*aI.price)).toFixed(2)
                    console.log('New item added')
                        await transaction.update(userDocRef,{
                                'cart.items':arrayUnion({
                                id:aI.id,
                                name:aI.name,
                                price:aI.price,
                                qty:Number(aI.qty),
                                img:aI.img
                                }),
                                'cart.value':Number(calc_val)
                        })

                }
            }
            else{
                const calc_val=parseFloat(Number(cart['value']+aI.price*aI.qty)).toFixed(2)
                await transaction.update(userDocRef,{
                    cart:{
                        items:arrayUnion({
                        id:aI.id,
                        name:aI.name,
                        price:aI.price,
                        qty:aI.qty,
                        img:aI.img
                        }),
                        value:Number(calc_val)
                    }
                })
                console.log('Item added succesfully')
                res.status(200).send('Item added succesfully')
            }
        })
        

    }catch(e){
        console.log(e)
        res.send(e.message).status(400)
    }
})

app.post('/updateAddress',verifyToken,async(req,res)=>{
    try{
        var temp=[]
        let userDocId = null;
        const q=query(collection(db,'users'),where('uid','==',activeUid))
        const query_result=await getDocs(q)
        query_result.forEach((doc) => {
            temp.push({
                ...doc.data()
            });
            userDocId = doc.id;  
        })
        const data=temp[0]
        const addrs=data.addrs
        const aI=(req.body)
        console.log(aI)
        const userDocRef = doc(db, 'users', userDocId);
        if(aI.type==='add'){
            const res=await updateDoc(userDocRef,{
                "addrs":arrayUnion({
                    'flat':aI.fn,
                    'street':aI.st,
                    'landmark':aI.lm,
                    'city_state':aI.ct,
                    'pincode':aI.pc
                })
            })
        }else{
            const res=await updateDoc(userDocRef,{
                "addrs":arrayRemove({
                    'flat':aI.fn,
                    'street':aI.st,
                    'landmark':aI.lm,
                    'city_state':aI.ct,
                    'pincode':aI.pc
                })
            })
        }
        res.status(200).send('success')
    }catch(e){
        console.log(e)
        res.send(e.message).status(400)
    }
})
app.post('/updatePayment',verifyToken,async(req,res)=>{
    try{
        var temp=[]
        let userDocId = null;
        const q=query(collection(db,'users'),where('uid','==',activeUid))
        const query_result=await getDocs(q)
        query_result.forEach((doc) => {
            temp.push({
                ...doc.data()
            });
            userDocId = doc.id;  
        })
        const data=temp[0]
        const paymt=data.paymt
        const aI=(req.body)
        console.log(aI)
        const userDocRef = doc(db, 'users', userDocId);
        if(aI.type==='add'){
            const res=await updateDoc(userDocRef,{
                "paymt":arrayUnion({
                    'card_no':aI.i1,
                    'expiry':aI.i2,
                    'cvv':aI.i3,
                    'name':aI.i4,
                })
            })
        }else{
            const res=await updateDoc(userDocRef,{
                "paymt":arrayRemove({
                    'card_no':aI.i1,
                    'expiry':aI.i2,
                    'cvv':aI.i3,
                    'name':aI.i4,
                })
            })
        }
        res.status(200).send('success')
    }catch(e){
        console.log(e)
        res.send(e.message).status(400)
    }
})
app.post('/addOrder',verifyToken,async(req,res)=>{
    try{
        const postRef=collection(db,'orders')
        const {body}=req
        const data={id:v4(),data:body}
        console.log(data)
        const result=await addDoc(postRef,data)
        //to get the required doc of user to update the cart
        var temp=[]
        let userDocId = null;
        const q=query(collection(db,'users'),where('uid','==',activeUid))
        const query_result=await getDocs(q)
        query_result.forEach((doc) => {
            temp.push({
                ...doc.data()
            });
            userDocId = doc.id;  
        })
        const userDocRef = doc(db, 'users', userDocId);
        await updateDoc(userDocRef,{
            "cart.items":[null],
            "cart.value":0
        })
        res.send('success')
    }catch(e){
        console.log(e)
        res.status(400)
    }
})
app.get('/userOrders',verifyToken,async(req,res)=>{
    try{
        var temp=[]
        const q=query(collection(db,'orders'),where('data.uid','==',activeUid))
        const query_result=await getDocs(q)
        query_result.forEach((doc) => {
            temp.push({
                ...doc.data()
            });
        })
        console.log(temp)
        res.send(temp).status(200)
    }catch(e){
        console.log(e)
        res.status(400).send('error')
    }
})
app.get('/adminOrders',verifyToken,async(req,res)=>{
    try{
        var temp=[]
        const query_result=await getDocs(collection(db,'orders'))
        query_result.forEach((doc) => {
            temp.push({
                ...doc.data()
            });
        })
        console.log(temp)
        res.send(temp).status(200)
    }catch(e){
        console.log(e)
        res.status(400).send('error')
    }
})