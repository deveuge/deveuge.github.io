module.exports = {
  siteMetadata: {
    title: `Deveuge`,
    subtitle: `Portfolio personal`,
    author: {
      name: `Deveuge`,
      summary: `Desarrolladora web Full-Stack en constante aprendizaje. Empleo y he trabajado con tecnologías como Java, Spring, Hibernate o SQL Server para desarrollar aplicaciones web y móvil responsive adaptadas a las necesidades de cada cliente.`,
    },
    description: `Desarrolladora web Full-Stack en constante aprendizaje. Empleo y he trabajado con tecnologías como Java, Spring, Hibernate o SQL Server para desarrollar aplicaciones web y móvil responsive adaptadas a las necesidades de cada cliente.`,
    siteUrl: `https://deveuge.github.io/`,
    social: {
      twitter: `deveuge`,
      github: `deveuge`,
      email: `deveuge@gmail.com`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              removeAccents: true,
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-disable-404`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Deveuge Portfolio`,
        short_name: `Deveuge`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#573a7d`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,

  ],
}
