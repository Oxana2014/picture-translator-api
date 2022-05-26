const handleSignin = async (req, res, db, bcrypt) => {
    const {email, password} = req.body;
if(!email || !email.trim().length || !password || !password.trim().length)
{
  return  res.status(400).json("incorrect form submission")
} else {
    try {
   const data = await db.select('email', 'hash').from('login').where('email', '=', email)
        if(data && data.length) {
           const isValid = await  bcrypt.compareSync(password, data[0].hash);
           // console.log(isValid)
           if(isValid) {
               db.select('*').from('users')
               .where('email', '=', email)
               .then(users => {return res.json(users[0])
               })
               .catch( err => {
                   console.log(err);
                  return res.status(400).json("unable to get user")
               }
                )
           }
           else {
            return  res.status(400).json("wrong credentials")
           }
        }
        else {
          //  console.log("no data from db");
      return  res.status(400).json("wrong credentials") 
        }      
    } catch(err) {
      //  console.log(err);
      return  res.status(400).json("wrong credentials")
    }  
  } 
}

module.exports = {handleSignin: handleSignin};