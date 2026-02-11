export const appState = {
  vendor:"eaton",
  slots:Object.fromEntries(
    Array.from({length:48},(_,i)=>[i+1,{serverId:null,utilization:"normal"}])
  )
};
export function setSlot(slot,key,val){ appState.slots[slot][key]=val; }
