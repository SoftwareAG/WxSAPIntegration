package wx.sap.integration.salesOrders;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
// --- <<IS-END-IMPORTS>> ---

public final class javaServices

{
	// ---( internal utility methods )---

	final static javaServices _instance = new javaServices();

	static javaServices _newInstance() { return new javaServices(); }

	static javaServices _cast(Object o) { return (javaServices)o; }

	// ---( server methods )---




	public static final void ceilNumber (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(ceilNumber)>> ---
		// @sigtype java 3.5
		// [i] field:0:required inNumber
		// [o] field:0:required outNumber
		IDataCursor inPipelineCursor = pipeline.getCursor();
		String inNumber = IDataUtil.getString(inPipelineCursor, "inNumber");
		inPipelineCursor.destroy();
		
		Double inNumberAsDouble = Math.ceil(Double.parseDouble(inNumber));
		Integer inNumberAsInteger = inNumberAsDouble.intValue();
		
		IDataCursor outPipelineCursor = pipeline.getCursor();
		IDataUtil.put(inPipelineCursor, "outNumber", inNumberAsInteger.toString());
		outPipelineCursor.destroy();
		
		
			
		// --- <<IS-END>> ---

                
	}



	public static final void getSubDocListFromDocList (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(getSubDocListFromDocList)>> ---
		// @sigtype java 3.5
		// [i] record:1:required inDocList
		// [i] field:0:required inSubDocListNumber
		// [i] field:0:required inSubDocListSize
		// [o] record:1:required outSubDocList
		IDataCursor pipelineCursor = pipeline.getCursor();
		IData[] inDocList = IDataUtil.getIDataArray(pipelineCursor, "inDocList");
		int listNumber = Integer.parseInt(IDataUtil.getString(pipelineCursor, "inSubDocListNumber"));
		int listSize = Integer.parseInt(IDataUtil.getString(pipelineCursor, "inSubDocListSize"));
		pipelineCursor.destroy();
		
		if(inDocList == null) {
			throw new ServiceException("inDocList is null");
		}
		
		int startIndex = 0 ;
		if(listNumber > 1) {
			startIndex = (listNumber - 1) * listSize;
		}
		
		int endIndex = (listNumber * listSize) - 1;
		int inDocListSize =  inDocList.length;
		
		if(endIndex > (inDocListSize - 1)) {
			endIndex = inDocListSize - 1;
		}
		
		IData[] outDocList = new IData[(endIndex - startIndex) + 1];
		
		int j=0;
		for(int i=startIndex; i<endIndex + 1; i++) {
			outDocList[j] = inDocList[i];
			j = j + 1;
		}
		
		IDataCursor outPipelineCursor = pipeline.getCursor();
		IDataUtil.put(pipelineCursor, "outSubDocList", outDocList);
		outPipelineCursor.destroy();
		// --- <<IS-END>> ---

                
	}
}

