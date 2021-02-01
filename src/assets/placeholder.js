<nav>
<Link to="/">
  <img src="logo.png" alt="Logo" style={{ height: "50px" }} />
</Link>
<Link to="/orders"> ORDERS</Link> |{" "}
<Link to="/dashboard">CAFE DASHBOARD</Link> |{" "}
<Link to="/coffees"> COFFEES</Link> |{" "}
<Link to="/cafes"> CAFES</Link> | <Link to="/admin">ADMIN</Link>
{!loggedInUser ? (
  <>
    <Link to="/login">
      <Button color="primary" size="sm" style={{ margin: "2px" }}>
        LOG IN
      </Button>
    </Link>
    <Link to="/register">
      <Button color="info" size="sm" style={{ margin: "2px" }}>
        SIGN UP
      </Button>
    </Link>
  </>
) : (
  <Link to="/logout">
    <Button
      color="dark"
      size="sm"
      style={{ margin: "5px" }}
      onClick={handleLogout}
    >
      LOG OUT
    </Button>
  </Link>
)}
</nav>