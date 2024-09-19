import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import navigationLinks from '../navigationLinks';

export default function ProductPage(){
    const { productId } = useParams();
    console.log(productId);

    return (
      <div>
        <Navigation
          shoppingOnClick={() => {}}
          cartAmount={0}
          links={navigationLinks}
        ></Navigation>
      </div>
    );
}