const axios = require('axios')

module.exports.getRecipes = (req, res, next) => {
  axios.get('https://tasty.p.rapidapi.com/recipes/list', {
    headers: {
      'X-RapidAPI-Key': 'e9c05414a1msha9cfab00c16569dp1b9d5djsnd33f9aca9679',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    },
    params: {
      from: 0,
      size: 20,
      q: req.params.mainIngredient
    }
  })
    .then(response => {
      res.json(response.data.results)
    })
    .catch(err => console.log(err))
  // const options = {
  //   method: 'GET',
  //   url: 'https://tasty.p.rapidapi.com/recipes/list',
  //   params: {
  //     from: 0,
  //     size: 20,
  //     q: req.params.mainIngredient
  //   },
  //   headers: {
  //     // make these .env variables
  //     'X-RapidAPI-Key': '37c1bc8015mshadb2731ba644b10p180078jsn4abbfafbbee5',
  //     'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  //   }
  // };
  
  // axios.request(options)
  //   .then(function (response) {
  //     // console.log('es esto girlie', response.data.results)
  //     // const filteredResponse = response.data.results.filter(recipe => {
  //     //   recipe.sections.forEach(section => {
  //     //     let contains = 0
  //     //     req.params.otherIngredients.split(' ').forEach(ingredient => {
  //     //       console.log(ingredient)
  //     //       ingredient.includes(ingredient) ? contains++ : null
  //     //     })
  //     //     contains === req.params.otherIngredients.split(' ').length ? true : false
  //     //   })
  //     // })
  //     // console.log(filteredResponse)
  //     res.json(response)
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
}

module.exports.getRecipeDetail = (req, res, next) => {
  axios.get('https://tasty.p.rapidapi.com/recipes/get-more-info', {
    headers: {
      'X-RapidAPI-Key': '37c1bc8015mshadb2731ba644b10p180078jsn4abbfafbbee5',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    },
    params: {id: req.params.id}
  })
    .then(response => res.json(response.data.results))
    .catch(next)
}