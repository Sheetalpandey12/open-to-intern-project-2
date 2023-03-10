const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModels")

const getInterns = async function (req,res){
    try{
    let fillters = req.query
    // let tosend = {}
    const{collegeName}=fillters
    if(collegeName===undefined){ return res.status(400).send({status:false,message:"collegeName must be provided"})}
    if(Object.keys(fillters).length==0){return res.status(400).send({status:false,message:"cannot provide empty querry"})}
    colLege= await collegeModel.findOne({name:collegeName})
    if(!colLege){ return res.status(404).send({status:false,message:"No such college found"})}
    let collegeId=colLege._id
    let interns = await internModel.find({isDeleted:false,collegeId:collegeId})
    //  colLege.interns=interns
    let tosend ={name:colLege.name,
                 fullName:colLege.fullName,
                 logoLink:colLege.logoLink,
                 interns:interns}
    console.log(tosend)
    // tosend.interns=interns
    res.status(200).send({status:true,data:tosend})
    }catch(error){
        res.status(500).send({status:false,message:error.message})
    }
}




const createCollege = async (req, res) => {
  try {
    let data = req.body;

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide data" })

    const { name, fullName, logoLink } = data

    if (!name) return res.status(400).send({ status: false, message: "please provide name" })
    const validName = (/^[a-z .]{3,50}$/)
    if (!validName.test(name)) return res.status(400).send({ status: false, message: "Invalid name." })

    if (!fullName) return res.status(400).send({ status: false, message: "please provide fullname" })
    
    if (!validName.test(fullName)) return res.status(400).send({ status: false, message: "Invalid fullname." })


    if (!logoLink) return res.status(400).send({ status: false, message: "please provide logolink" })
    
        const result = await collegeModel.create(data);
    return res.status(201).send({ status: true, data: result});
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


module.exports.createCollege = createCollege;

module.exports.getInterns=getInterns