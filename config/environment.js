
const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'mayankag365@gmail.com',
            pass: 'dhhjybpmkvogagsq'
        }
    },
    google_client_id: "559058781489-82rpb0bap8btt4mli1vbuggngte4hte3.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
}

const production = {
    name: 'production'
}

module.exports = development;