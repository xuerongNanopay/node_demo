exports.pageNoFund = (req, resp, next) => {
  resp.status(404).send('{"error_code": "404"}')
}