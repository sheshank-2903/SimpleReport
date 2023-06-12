import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField,Button,Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import  getChatbotResponse  from './chatbot';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';

function Middle() {

    const theme = useTheme();
    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const [response,setResponse]=useState("");
    const [loading, setLoading] = React.useState(false);

    function splitIntoParagraphs(text, maxLength) {
      const sentences = text.split('. ');
      let currentParagraph = '';
      const paragraphs = [];
      for (let i = 0; i < sentences.length; i++) {
        setLoading(true);
        const sentence = sentences[i];
        if ((currentParagraph + sentence).length > maxLength) {
          paragraphs.push(currentParagraph.trim());
          currentParagraph = sentence + '. ';
        } else {
          currentParagraph += sentence + '. ';
        }
      }
      paragraphs.push(currentParagraph.trim());
      return paragraphs;
    }

    async function handleSendMessage(e) {
      const message="remove duplicates, show major points with very short sumamry in this format 1.Listpoint:short summary";
      var paras=splitIntoParagraphs(text,3300);
      let final="";
      for(let i=0;i<paras.length;i++){
          await getChatbotResponse(paras[i]+message).then((v)=>{
            final+=(v.data.choices[0].text);
          });
          console.log("final  :: ",final);
      }
      let final_output="";
        await getChatbotResponse(final+"Remove duplicate points and give output in format 1.Listpoint:short summary").then((v)=>{
          final_output+=(v.data.choices[0].text);
        });
        console.log("final output ::  ",final_output);
        setValue(final_output);
        setLoading(false);
    }
  return (
    <Box style={{paddingTop:'5%',flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <TextField
          id="outlined-textarea"
          label="Your Article Collections"
          placeholder="Black theme is mandatory , Press enter after text"
          multiline
          maxRows={3}
          style={{width:'90%'}}
          onKeyDown={(e)=>{
            if(e.key=='Enter')
              handleSendMessage(e);
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setText(event.target.value);
          }}
          value={text}
        />
        <Divider style={{color:'white',width:'5%',marginTop:'5%'}}/>
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
        <textarea
        value={value}
        rows={1}
        contentEditable={false}
        placeholder="Article Major points will be displayed here.."
        style={{width: "90%",height:250}}/>
    </Box>
  );
}
export default Middle;