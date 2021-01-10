export default function authHeader() {
    const organization = JSON.parse(localStorage.getItem('organization'));
  
    if (organization && organization.token) {
      return { Authorization: 'Bearer ' + organization.token };
    } else {
      return {};
    }
  }