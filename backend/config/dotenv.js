// Configuração do dotenv para carregar variáveis de ambiente
const dotenv = require('dotenv');
const path = require('path');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = { dotenv };