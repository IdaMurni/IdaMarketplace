import Teasers from '../components/teasers'
import Header from '../components/header'
import MostReviews from '../components/most-reviews'
import Categories from '../components/category'

export default function Home() {
  return (
      <div>
        <Header></Header>
        <Teasers></Teasers>
        <MostReviews></MostReviews>
        <Categories></Categories>
      </div>
  )
}
