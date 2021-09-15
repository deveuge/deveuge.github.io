const ghpages = require('gh-pages')

// replace with your repo url
ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'https://github.com/deveuge/deveuge.github.io.git',
  },
  () => {
    console.log('Deploy completed!')
  }
)