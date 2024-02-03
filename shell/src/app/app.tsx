//@ts-noCheck
import * as React from 'react';
import { importRemote } from '@module-federation/utilities';
import {Link as RouterLink, Route, Routes} from 'react-router-dom';
import {
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  CssBaseline,
} from '@mui/material';
import * as Icons from '@mui/icons-material';
import {DataProvider} from "@banking/data-context";

import {AppBar} from "./Appbar";
import {Drawer} from "./Drawer";
import Dashboard from "./Dashboard";
import Copyright from "./CopyRight";

import styles from "./app.module.css";
import {getPluginsInManager} from './manager';


export function App() {
  const [open, setOpen] = React.useState(true);
  const MenuIcon = Icons.Menu;
  const ChevronLeftIcon = Icons.ChevronLeft;
  const [plugins, setPlugins] = React.useState([{path:'/',component:Dashboard,icon: "HomeOutlined",title:"Home"}])
  const [services , setServices] = React.useState<{plugin:string,servicesList:object}[]>([])

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(()=>{
    getPluginsInManager().then(receivedPlugins=>{
      setPlugins([...plugins, ...receivedPlugins])
      receivedPlugins.forEach(plugin =>{
        if(plugin.services !== null){
          setServices([...services , {plugin:plugin.title , servicesList:plugin.services}])
        }
      })
    })
  },[])
  return (
    <DataProvider>
      {/*<button onClick={()=>{services[0].servicesList.sayHello()}}>click me</button>*/}
      <Box sx={{display: 'flex'}}>
        <CssBaseline/>
        <AppBar position="absolute" open={open}>
          <Toolbar
            className={styles.headerToolbar}
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && {display: 'none'}),
              }}
            >
              <MenuIcon/>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{flexGrow: 1}}
            >
              Banking
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon/>
            </IconButton>
          </Toolbar>
          <Divider/>
          <List component="nav">
            {
              plugins.map(plugin =>{
                const Icon = Icons[plugin.icon]
                return(
                  <RouterLink to={plugin.path} className={styles.MenuLinks}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon/>
                      </ListItemIcon>
                      <ListItemText primary={plugin.title}/>
                    </ListItemButton>
                  </RouterLink>
                )
              })
            }
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar/>
          <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid item xs={12}>
              <Paper className={styles.routesContainer} sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <React.Suspense fallback={null}>
                  <Routes>
                    {plugins.map(plugin => {
                      let ComponentTag:React.ElementType = plugin.component
                      return <Route path={plugin.path} element={<ComponentTag />} />
                    })}
                  </Routes>
                </React.Suspense>
              </Paper>
            </Grid>
            <Copyright sx={{pt: 4}}/>
          </Container>
        </Box>
      </Box>
    </DataProvider>

  );
}

export default App;
