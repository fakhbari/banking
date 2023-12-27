import * as React from 'react';
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

import styles from "./app.module.css"

const Customer = React.lazy(() => import('customer/Module'));
const Deposit = React.lazy(() => import('deposit/Module'));
const Facilities = React.lazy(() => import('facilities/Module'));

export function App() {
  const [open, setOpen] = React.useState(true);
  const HomeIcon = Icons.HomeOutlined;
  const CustomerIcon = Icons.SupervisorAccountOutlined;
  const DepositIcon = Icons.AccountBalanceWalletOutlined;
  const FacilitiesIcon = Icons.AssignmentOutlined;
  const MenuIcon = Icons.Menu;
  const ChevronLeftIcon = Icons.ChevronLeft;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <DataProvider>
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
            <RouterLink to="/" className={styles.MenuLinks}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
              </ListItemButton>
            </RouterLink>
            <RouterLink to="/customer" className={styles.MenuLinks}>
              <ListItemButton>
                <ListItemIcon>
                  <CustomerIcon/>
                </ListItemIcon>
                <ListItemText primary="Customer"/>
              </ListItemButton>
            </RouterLink>
            <RouterLink to="/deposit" className={styles.MenuLinks}>
              <ListItemButton>
                <ListItemIcon>
                  <DepositIcon/>
                </ListItemIcon>
                <ListItemText primary="Deposit"/>
              </ListItemButton>
            </RouterLink>
            <RouterLink to="/facilities" className={styles.MenuLinks}>
              <ListItemButton>
                <ListItemIcon>
                  <FacilitiesIcon/>
                </ListItemIcon>
                <ListItemText primary="Facilities"/>
              </ListItemButton>
            </RouterLink>
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
                    <Route path="/" element={<Dashboard />} />

                    <Route path="/customer" element={<Customer />} />

                    <Route path="/deposit" element={<Deposit />} />

                    <Route path="/facilities" element={<Facilities />} />
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
