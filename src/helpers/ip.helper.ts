// import http from "http";
// import publicIp from "public-ip";
// // http.get({ "host": "api.ipify.org", "port": 80, "path": "/" }, function(resp) {
// //   resp.on("data", function(ip) {
// //     console.log("My public IP address is: " + ip);
// //   });
// // });

// /**
//  * Function to get Ip
//  */
// async function getIp(){
  
//   let ipAddress;

//   console.log("publicIP", await publicIp.v4())
//   return http.get({ "host": "api.ipify.org", "port": 80, "path": "/" }, function(resp) {
//     resp.on("data", function(ip) {
//       console.log("My public IP address is: " + ip);
      
//     });
//   });
//   return ipAddress;
// }

// export { getIp };
