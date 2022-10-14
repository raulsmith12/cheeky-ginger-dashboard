import NavCard from '../components/NavCard'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1>Welcome</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-3 px-2 py-2">
          <NavCard cardTitle="Home Page Content" cardDesc="Main content that is found on the home page" url="/home-fields" />
        </div>
        <div className="col-3 px-2 py-2">
          <NavCard cardTitle="Home Page Section" cardDesc="Other content that is found on the home page" url="/home-sections" />
        </div>
        <div className="col-3 px-2 py-2">
          <NavCard cardTitle="Home Page Sliders" cardDesc="The image carousel that is found in the home page" url="/home-sliders" />
        </div>
        <div className="col-3 px-2 py-2">
          <NavCard cardTitle="Social Icons" cardDesc="Social media icons found on the home page" url="/socials" />
        </div>
        <div className="col-3 px-2 py-2">
          <NavCard cardTitle="Privacy Page" cardDesc="Page content for the Privacy Policy page" url="/privacy" />
        </div>
        <div className="col-3 px-2 py-2">
          <NavCard cardTitle="Terms Page" cardDesc="Page content for the Terms of Service page" url="/terms" />
        </div>
        <div className="col-3 px-2 py-2">
          <NavCard cardTitle="Edit/Remove Products" cardDesc="Edit current existing products, add new product tags and images, and even remove products no longer available" url="/products" />
        </div>
        <div className="col-3 px-2 py-2">
          <NavCard cardTitle="Add Products" cardDesc="Add new products to the store" url="/products/add" />
        </div>
      </div>
    </div>
  )
}

export default Home;