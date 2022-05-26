const { json } = require('body-parser');
const Clarifai = require('clarifai')

const clarifaiKey = process.env.CLARIFAI_API;
const clarifaiApp = new Clarifai.App({
  apiKey: clarifaiKey
})

const handleApiCall = async (req, res) => {
  const {input} = req.body;
  clarifaiApp.models.predict( Clarifai.FOOD_MODEL, input )
  .then(resp => {
      res.json(resp.outputs[0].data)
  })
  .catch(err => {
     // console.log(err);
      res.status(400).json("unable to work with api")
  })
  
//  console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
}

const handleEntries = (req, res, db) => {
  const {id} = req.body;   
db('users').where('id', '=', id)
.increment('entries', 1)
.returning('entries')
.then(entries => {
   return res.json(entries[0].entries)
})
.catch(err => {
   // console.log(err)
  return res.status(400).json(" user not found")
}) 
}

module.exports = { handleApiCall, handleEntries}
