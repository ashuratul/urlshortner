// function validateUrl(value) {
//     var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
//           '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
//           '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
//           '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
//           '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
//           '(\\#[-a-z\\d_]*)?$','i');
  
//         return !!urlPattern.test(value);
//   }
  
//   module.exports = { validateUrl };
 function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }
    module.exports = { validateUrl };

