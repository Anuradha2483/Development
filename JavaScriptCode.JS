const OpenAIApi = require('openai');
const json = require('json');
const pandas = require('pandas');
const hana = require('@sap/hana-client');
const ChatOpenAI = require("@langchain/openai");
const ChatPromptTemplate = require("@langchain/core/prompts");
// const chatModel = new ChatOpenAI({});
const conn = hana.createConnection();

process.env['OPENAI_API_KEY']="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";
function fetchdata(){
       
        const connParams = {  
                    host: 'f29d2cfc-dbc6-4177-ba76-77b9927fcd49.hana.prod-us10.hanacloud.ondemand.com',
                    port: '443',
                    uid: 'SIANURADHA',
                    pwd: 'Varahi@2023',
                    traceFile: 'stdout',
                    traceOptions: 'sql=warning',
                    encrypt: 'true',
                    sslValidateCertificate: 'false'
                    };
        conn.connect(connParams, function(err){
                    if (err) {
                        console.error("Error connecting");
                        throw err;
                    }
                    try {
                        conn.execute('SET SCHEMA "SIANURADHA"');
                        // const sql_query = "SELECT * FROM SAMPLE_DATA";
                        const sql_query = "SELECT * FROM SAMPLE_DATA";
                        conn.exec(sql_query, 
                                        function (err, result) {
                                            if (err) throw err;
                                            const output = result;
                                            console.log(output);
                                            const response = invoke_LLM(output);
                                            conn.disconnect();
                                        })
                        // console.log(output);               
                        } 
                    catch(e) {
                        console.error(e);
                    }
                }); 
}
function invoke_LLM(output) {
    // await chatModel.invoke("what is LangSmith?");
    // const openai_api_key = process.env.openai_api_key;;
    const model = 'gpt-3.5-turbo-16k-0613';
    const rows_final = output;

    const chat = new OpenAI({openai_api_key: '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', model: model});
    };
const llm_response = fetchdata();
console.log(llm_response);