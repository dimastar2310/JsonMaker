import fs from 'fs/promises';
import log from '@ajar/marker';
// import { resolve } from 'path';
// import { reject } from 'bluebird';
//import Promise from "bluebird";
import Liker from './personLiker.mjs';
let file_arr = [];

console.time('myProcess') ;
(async ()=>{
    
    log.magenta('start code...');
    
    let data = await fs.readdir('./LEADS'); //array of strings
   
    //console.timeEnd('myProcess');
    const pending = data.map(file => new Promise((resolve, reject) => { //making array of promises
      
          resolve(file);
  
      }));
      //parrarel style
      const population = await Promise.allSettled(pending); //one after another will return
      population.forEach(async (population,index) => {
        if(population.status === 'fulfilled'){////always going to be fullfiled i guess
        //   log.info(countries[index],`population of ${countries[index]} is ${population.value}`);
        try{
            log.magenta('start code...');
            
            let data = await fs.readFile(`LEADS\\${population.value}`, 'utf-8'); //popuation.value => returns resolved value
            //log.cyan('FIle loaded!, Contents:',data)

            let data_arr = data.split('\n').split(",");
     
            let person_likers = data_arr.map(arr => new Liker(arr[0],arr[1],arr[2]));
    
            const jsonString = JSON.stringify(person_likers);
            
                (async ()=> {
                    const content = jsonString;//'Some really really really fresh new content here...'; //may be some api 
                    await fs.writeFile('./files/result.json',content) //
                    log.green('File written successfully!')
                })().catch( err => log.red('Error writing the file:',err.message))
        

        }catch(error){
            log.error(error);
        }
          
            
        }
        else if(population.status==='rejected'){
            console.log("rejected");
        //   log.info(countries[index],"no population found");
        }
    
      })  
     
      

    
})().catch(log.error);

