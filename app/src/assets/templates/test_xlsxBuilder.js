// Requires
const axios = require('axios').default
const qs = require('qs')

// Envars
let CLIENT_ID = process.env.CMNSRV_CLIENTID
let CLIENT_SECRET = process.env.CMNSRV_CLIENTSECRET
// let TOKEN_URL = process.env.COMMON_DOCGEN_SSO_ENDPOINT  // temporarily swapped out for troubleshooting
let TOKEN_URL = "https://dev.oidc.gov.bc.ca/auth/realms/jbd6rnxw/protocol/openid-connect/token"

// Get token
function get_docgen_token() {
    let params = qs.stringify({
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "scope": ""
    })

    let header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    axios
        .post(TOKEN_URL, params, header)
        .then(res => {
            return res.data.access_token
        })
        .catch(error => {
            console.error(error)
        })
}

let token = get_docgen_token()
