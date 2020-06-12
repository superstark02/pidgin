import React from 'react';
import {FaThumbsUp, FaDownload,} from 'react-icons/fa'  
import {rdb} from '../firebase'
import './list.css'
import MyListItem from './listItem';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { FixedSizeList } from 'react-window';



var length;

class ClassList extends React.Component{
  state = {
      classes:null,
      name:"null",
      latitude:0,
      longitude:0,
    }
    
    constructor(props){
      super(props);
      this.state = {
        words: [],
      }
    }

    position = async () => {
      await navigator.geolocation.getCurrentPosition(
        position => this.setState({ 
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude
        }), 
        err => console.log(err)
      );
    }

    calculateDistance(lat1, lon1, lat2, lon2){
      var p = 0.017453292519943295;
      var c = Math.cos;
      var asin = Math.asin
      var sqrt = Math.sqrt
      var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
      return 12742 * asin(sqrt(a));
    }

    componentDidMount(){

      this.position();

      var userId = 'Location'
      const d = rdb.ref().child(userId);    
      d.on('value',(snapshot)=>{
        var words = snapshot.val();
        length = snapshot.numChildren()
        var newState = [];
        
        for(var i = 0; i<length-1; i++){
          for(var j = 0; j <length-1-i; j++){
            var distance1 = this.calculateDistance(this.state.latitude, this.state.longitude, words[j].lat, words[j].lon)
            var distance2 = this.calculateDistance(this.state.latitude, this.state.longitude, words[j+1].lat, words[j+1].lon)
            if(distance1>distance2){
              var temp = words[j]
              words[j] = words[j+1]
              words[j+1] = temp 
            }
          }
          newState.push({id: words[i].id});
        }

        for(let word in words){
          newState.push({id:words[word].id})
      }

        this.setState({words:newState})
      });
      
    }
    
    render(){
      if(length==null){
        return <div>
                  <div style={{backgroundColor:'#E6E6E6'}}>
                      <div class='number'><FaDownload size='12' style={{marginRight:'5px'}}/> Please Wait...</div>
                        <div style={{padding:'5px',maxWidth:'100%'}} >
                          <div style={{borderRadius:'10px',backgroundColor:'white',padding:'20px'}} >
                            <Skeleton variant="rect" width="100%" height={200}  />
                            <Typography variant="h3">
                              <Skeleton />
                            </Typography>
                            <Typography variant="h5">
                              <Skeleton />
                            </Typography>
                          </div>
                        </div>
                    </div>
              </div>
      }
      else{
        return(
          <div>
            <div style={{backgroundColor:'#E6E6E6'}}>
                <div class='number'><FaThumbsUp size='12' style={{marginRight:'5px'}}/> Found {length} Pidgin classes around you.</div>
                    {  
                        this.state.words.map(images=>{
                        return <MyListItem classID={images.id}/>
                      })
                    }  
              </div>
        </div>
      )
      }
    }
}
export default ClassList;