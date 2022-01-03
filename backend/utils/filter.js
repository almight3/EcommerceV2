class SearchAndFilter{
    constructor(query,queryStr){
        this.query =  query;
        this.queryStr =  queryStr
    }
// Function for search product
    Search(){
        const keyword = this.queryStr.keyword ?
        {
            name:{
                $regex:this.queryStr.keyword, //regex mongoDB
                $options :"i",    // search even in small case
            },
        }
        :{};
    this.query = this.query.find({...keyword})
    console.log(keyword)
    return this; 
    }
// filter function 
   filter(){   
    const copyQueryString = {...this.queryStr};
    //remove uneccessery fileds
    const removeFields = ["keyword","limit","page"]
    removeFields.forEach(key => delete copyQueryString[key]);
    
// price filter
   let queryStr = JSON.stringify(copyQueryString);
// adding $ for mongo query using regex   
   queryStr  = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);
   this.query = this.query.find(JSON.parse(queryStr));
   console.log(queryStr)
   return this;  
};     
// adding pagination 
pagination(productPerPage){
    const currentPage = Number(this.queryStr.page) || 1;
    // product to be skip
    const skip = productPerPage * (currentPage -  1)
     
    this.query = this.query.limit(productPerPage).skip(skip)
    return this;
 };
}
module.exports = SearchAndFilter;