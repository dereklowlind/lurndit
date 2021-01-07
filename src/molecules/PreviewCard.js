import { ReactTinyLink } from "react-tiny-link";

function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

function PreviewCard(props){  
    if(isValidHttpUrl(props.url)){
        // if(props.url.includes())
        //             <iframe src={props.url}
        //         frameborder='0'
        //         allow='autoplay; encrypted-media'
        //         allowfullscreen
        //         title='video'
        // />
        return(
            <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={props.url}
            />

        )
    }else{
        return(
            <div style={{
                color: "grey",
                borderColor: "grey",
                borderWidth: "2px",
                borderStyle: "solid",
                marginTop: "4px",
                padding: "2px",
                textAlign: "center"
            }}>404 Invalid Url</div>
    
        )
    }
}
export default PreviewCard