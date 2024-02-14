# Documentation for Idea API

**Base url**: http://localhost:4000/api  
**Author**: Jamshid Yusupov  
**Email**: jamshudanamana@gmail.com  
**Telegram**: [jamshudanamana](https://t.me/jamshudanamana)

## Endpoints:

### Auth:

`/auth/register`:

**description**: creates new user  
**need access token**: no  
**method**: post  
**body example:**

```
{
  name: "Jamshud";
  email: "jamshudanamana@gmail.com";
  phone: "+998901234567";
  password: "12345678";
}
```

`/auth/login`:

**description**: sign in your account  
**need access token**: no  
**method**: post  
**body example:**

```
{
  email: "jamshudanamana@gmail.com";
  password: "12345678";
}
```

`/auth/refresh`:

**description**: updates refresh_token and access_token using last refresh_token gotten from cookies  
**need access token**: no  
**method**: get

`/auth/logout`:

**description**: for loging out your account  
**need access token**: yes  
**method**: post

`/auth/me`:

**description**: get info about yourself  
**need access token**: yes  
**method**: get