// import Bricks
import Bricks from 'lib/bricks.js'

// define your grid at different breakpoints, mobile first (smallest to largest)

if(document.querySelector('.bricks-grid')){
  const sizes = [
  { columns: 1, gutter: 0 },                   // assumed to be mobile, because of the missing mq property
  { mq: '640px', columns: 2, gutter: 0 },
  { mq: '768px', columns: 2, gutter: 0 },
  //3 columns at 1024 might break the page
  { mq: '1024px', columns: 3, gutter: 0 },
  { mq: '1280px', columns: 3, gutter: 0 },
  { mq: '1536px', columns: 3, gutter: 0 }
]

// create an instance

const instance = Bricks({
  container: '.bricks-grid',
  packed:    'data-packed',        // if not prefixed with 'data-', it will be added
  sizes:     sizes
})

// bind callbacks

instance
  .on('pack',   () => console.log('ALL grid items packed.'))
  .on('update', () => console.log('NEW grid items packed.'))
  .on('resize', size => console.log('The grid has be re-packed to accommodate a new BREAKPOINT.'))

// start it up, when the DOM is ready
// note that if images are in the grid, you may need to wait for document.readyState === 'complete'

document.addEventListener('DOMContentLoaded', event => {
  instance
    .resize(true)     // bind resize handler
    .pack()           // pack initial items
})

// add new items via AJAX

// fetch('path/to.html')
//   .then(response => response.text())
//   .then(html => {
//     document.querySelector('.container').appendChild(html)

//     // position them within the existing grid
//     instance.update()
//   })
}


