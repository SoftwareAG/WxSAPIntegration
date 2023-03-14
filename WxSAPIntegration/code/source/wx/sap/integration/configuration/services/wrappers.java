package wx.sap.integration.configuration.services;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
// --- <<IS-END-IMPORTS>> ---

public final class wrappers

{
	// ---( internal utility methods )---

	final static wrappers _instance = new wrappers();

	static wrappers _newInstance() { return new wrappers(); }

	static wrappers _cast(Object o) { return (wrappers)o; }

	// ---( server methods )---




	public static final void getResourceConfiguration (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(getResourceConfiguration)>> ---
		// @sigtype java 3.5
		// [i] field:0:required connectionAlias
		// [o] field:0:required packageName
		// [o] field:0:required connectionFactoryType
		// [o] field:0:required adapterTypeName
		// [o] field:0:required TemplateURL
		// [o] field:0:required mcfDisplayName
		// [o] field:0:required nodeType
		// [o] field:0:required connectionAlias
		// [o] record:1:required parameters
		// [o] - field:0:required value
		// [o] - field:0:required parameterType
		// [o] - field:0:required displayName
		// [o] - field:0:required systemName
		// [o] record:1:required connectionManagerProperties
		// [o] - field:0:required systemName
		// [o] - field:0:required displayName
		// [o] - field:0:required parameterType
		// [o] - field:0:required defaultValue
		// [o] - field:0:required value
		try {
			Service.doInvoke("wm.art.admin.connection", "getResourceConfiguration", pipeline);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// --- <<IS-END>> ---

                
	}
}

