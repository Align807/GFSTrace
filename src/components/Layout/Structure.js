import {React,useState} from 'react';
import 'antd/dist/antd.css';
import './layout.css';
import { Layout } from 'antd';
import Navbar from '../Sidebar/Navbar';
import Headerbar from '../HeaderFooter/Header';
import Footerbar from '../HeaderFooter/footer';
import SignIn from '../pages/Login/SignIn';
import Forget from '../pages/Login/Forget';
import SignUp from '../pages/Login/SignUp';

const { Header, Content, Footer, Sider } = Layout;
export default function Structure({children}) {
  const [collapsed, setcollapsed] = useState(false);

  return (<>
  {window.location.pathname==="/Login"?<SignIn/>:window.location.pathname==="/Forget"?<Forget/>:window.location.pathname==="/Signup"?<SignUp/>:
   <Layout style={{ minHeight: '100vh' }}>
      <Sider 
       collapsible  collapsed={collapsed} onCollapse={setcollapsed} >
      <Navbar compact={collapsed}></Navbar>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0,height:'62px',backgroundColor:'#dcdcdc' }} >
          <Headerbar/>
        </Header>
        <Content style={{ backgroundColor:'white' ,overflow:'auto',maxHeight:'-webkit-fill-available'}}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center',height:'56px',position:'sticky',backgroundColor:'#dcdcdc',bottom:0, padding: '10px 30px'}}>
          <Footerbar/>
          </Footer>
      </Layout>
    </Layout>}
    </>
  );
}
