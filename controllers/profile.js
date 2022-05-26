const getUserProfile = (req, res, db) => {
    const {id} = req.params;
   db.select('*').from('users').where({ id})
   .then(users => {
       if(users.length) {
      return res.json(users[0]);
       } else {
        return res.status(400).json("no such user")
       }
   }) .catch(err => {
    return res.status(400).json("error getting user")
   })
}

module.exports = {getUserProfile: getUserProfile}