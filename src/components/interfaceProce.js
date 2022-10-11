export const interfaceProce=(url)=>{
   let newUrl=url.split(" ")[1]
   let reqUrl=process.env.apiUrl+newUrl
      return reqUrl
}