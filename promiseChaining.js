require('./DB')
const users=require('./userModel')

const updateAndGetCount=async(id,age)=>{
    const updateUser=await users.findByIdAndUpdate(id,{$set:{age:age}},{new:true})
    const getCount=await users.countDocuments({age:{$gt:20}})
    return getCount
}

updateAndGetCount('685bcea69915620f6d375d1e',51).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})

