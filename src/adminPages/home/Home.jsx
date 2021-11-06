import Chart from "../../adminComponents/chart/Chart";
import FeaturedInfo from "../../adminComponents/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../adminComponents/dummyData";
import WidgetSm from "../../adminComponents/widgetSm/WidgetSm";
import WidgetLg from "../../adminComponents/widgetLg/WidgetLg";

export default function Home() {
  return (
    <div className="home">
      {/* <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
     <WidgetSm/>
      <WidgetLg/> */}
      {/* </div> */}
    </div>
  );
}