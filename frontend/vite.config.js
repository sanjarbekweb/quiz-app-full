export default {
  server: {
    proxy: {
      '/api': 'http://localhost:5000' // backend portini yoz
    }
  }
}
