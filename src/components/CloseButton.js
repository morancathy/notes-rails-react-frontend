import { MdClose } from "react-icons/md"
/**
 * Custom close button for the card scan view component
 * 
 * @returns button
 */
const CloseButton = ({ setShowScan }) => {

  const reposition = () =>{
    window.scroll({
      top: 0,
      left: 0
    })
  }

  return (  
    <div 
      type="button" 
      onClick={() => {
        setShowScan(false)
        reposition()
      }}
      ><MdClose />
    </div>
  );
}
 
export default CloseButton;