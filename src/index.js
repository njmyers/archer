// import { composeAsync } from 'smalldash';
import graphics from './tasks/graphics';

// const pipeline = composeAsync(
  // graphics
// )

graphics.then((response) => {
  console.log('all tasks completed successfully')
}).catch((error) => {
  console.log(error)
})
