const homePageConditional = () => {
  if (loggedInUser) {
      switch (loggedInUser.role) {
          case 'cafe':
            return (
                <>
                   <Route exact path="/dashboard" render={(props) => (
                <CafeDashboardView {...props} 
                  loggedInUser={loggedInUser} /> )} />
                </>
            )
          case 'user':
            return (
                <>
                  <Route exact path="/" render={(props) => ( 
                  <HomeView {...props}
                    coffees={coffees} setCoffees={setCoffees} setUserCoffee={setUserCoffee}/> )} />
              </>
            )
          case 'admin':
            return (
              <>
                <Route exact path="/admin" render={(props) => (
                <AdminHome {...props}
                  coffees={coffees} setCoffees={setCoffees} /> )} />
            </>
          )
      }
  }
  return null
}