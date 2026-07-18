// // // // // // // import React, { useState } from 'react';
// // // // // // // import { useChat } from '@ai-sdk/react';
// // // // // // // import { google } from '@ai-sdk/google';

// // // // // // // function AiAssistant() {
// // // // // // //   // Defensive API key check matching Step 6 error handling
// // // // // // //   const apiKey = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY;
// // // // // // //   const [initError, setInitError] = useState(!apiKey ? 'Missing VITE_GOOGLE_AI_STUDIO_API_KEY in .env.local' : '');

// // // // // // //   // Initialize the streaming client engine directly from your frontend workspace
// // // // // // //   const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat({
// // // // // // //     api: async ({ messages }) => {
// // // // // // //       // Connects directly to Google's fast text model using your environment key
// // // // // // //       const response = await google('gemini-1.5-flash', {
// // // // // // //         apiKey: apiKey
// // // // // // //       }).streamText({
// // // // // // //         messages,
// // // // // // //         system: `You are the dedicated onboarding concierge for the florence-focus-timer app. 
// // // // // // //         Your primary task is to answer inquiries on how to use the app clearly.
        
// // // // // // //         App Core Rules & Specifications for Context:
// // // // // // //         1. Current Goal Display: Shows the active task text, or defaults to "Maintain Beauty" if empty.
// // // // // // //         2. Modes: Focus Mode (user works), Rest Mode (short break 5m, long break 15m, or continuous focus).
// // // // // // //         3. Sorting Machine: Active uncompleted goals are always sorted newest-first at the very top. Checked/Completed tasks automatically drop directly underneath active tasks and sort newest-completed-first.
// // // // // // //         4. Pagination: Tasks are broken up into pages containing up to 2 items per view.
// // // // // // //         5. Persistence: All state data automatically backs up to local browser storage dynamically.
        
// // // // // // //         Keep your tone supportive, clear, and direct. Explain features naturally if asked.`
// // // // // // //       });
// // // // // // //       return response.toDataStreamResponse();
// // // // // // //     },
// // // // // // //     onError: (err) => {
// // // // // // //       console.error('Streaming connection disrupted:', err);
// // // // // // //     }
// // // // // // //   });

// // // // // // //   return (
// // // // // // //     <div className="task-section-block" style={{ marginTop: '22px' }}>
// // // // // // //       <h3>Timer Concierge AI</h3>
      
// // // // // // //       {/* Step 6 Error Handling Display blocks */}
// // // // // // //       {(initError || error) && (
// // // // // // //         <div className="task-error-text" style={{ marginBottom: '12px' }}>
// // // // // // //           ⚠️ {initError || 'Connection lost. Please verify your network or API key.'}
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       <div style={{ 
// // // // // // //         maxHeight: '200px', 
// // // // // // //         overflowY: 'auto', 
// // // // // // //         marginBottom: '14px', 
// // // // // // //         display: 'flex', 
// // // // // // //         flexDirection: 'column', 
// // // // // // //         gap: '8px' 
// // // // // // //       }}>
// // // // // // //         {messages.length === 0 ? (
// // // // // // //           <div className="empty-tasks-placeholder">
// // // // // // //             Ask me how to configure your goals, breaks, or timer sessions!
// // // // // // //           </div>
// // // // // // //         ) : (
// // // // // // //           messages.map(m => (
// // // // // // //             <div key={m.id} style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
// // // // // // //               <strong style={{ color: m.role === 'user' ? '#ff5c84' : '#4a3336' }}>
// // // // // // //                 {m.role === 'user' ? 'You: ' : 'AI: '}
// // // // // // //               </strong>
// // // // // // //               <span style={{ color: '#5c4a4d' }}>{m.content}</span>
// // // // // // //             </div>
// // // // // // //           ))
// // // // // // //         )}
// // // // // // //         {isLoading && <div className="empty-tasks-placeholder" style={{ textAlign: 'left' }}>Typing...</div>}
// // // // // // //       </div>

// // // // // // //       {/* <form onSubmit={handleSubmit} className="task-form-grid" style={{ marginBottom: 0 }}>
// // // // // // //         <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
// // // // // // //           <input
// // // // // // //             className="task-desc-input"
// // // // // // //             value={input}
// // // // // // //             placeholder="Ask a question about the app..."
// // // // // // //             onChange={handleInputChange}
// // // // // // //             disabled={!!initError}
// // // // // // //             style={{ flex: 1 }}
// // // // // // //           />
// // // // // // //           <button 
// // // // // // //             type="submit" 
// // // // // // //             className="add-task-btn" 
// // // // // // //             disabled={isLoading || !!initError}
// // // // // // //             style={{ minWidth: '70px' }}
// // // // // // //           >
// // // // // // //             Ask
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       </form> */}
// // // // // // //       <form 
// // // // // // //   onSubmit={(e) => {
// // // // // // //     e.preventDefault(); // THIS PREVENTS THE PAGE FROM REFRESHING
// // // // // // //     handleSubmit(e);    //  THIS FIRES THE AI STREAM ENGINE
// // // // // // //   }} 
// // // // // // //   className="task-form-grid" 
// // // // // // //   style={{ marginBottom: 0 }}
// // // // // // // >
// // // // // // //   <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
// // // // // // //     <input
// // // // // // //       className="task-desc-input"
// // // // // // //       value={input}
// // // // // // //       placeholder="Ask a question about the app..."
// // // // // // //       onChange={handleInputChange}
// // // // // // //       disabled={!!initError}
// // // // // // //       style={{ flex: 1 }}
// // // // // // //     />
// // // // // // //     <button 
// // // // // // //       type="submit" 
// // // // // // //       className="add-task-btn" 
// // // // // // //       disabled={isLoading || !!initError}
// // // // // // //       style={{ minWidth: '70px' }}
// // // // // // //     >
// // // // // // //       Ask
// // // // // // //     </button>
// // // // // // //   </div>
// // // // // // // </form>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default AiAssistant;


// // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // import { useChat } from '@ai-sdk/react';
// // // // // // import { google } from '@ai-sdk/google';

// // // // // // function AiAssistant() {
// // // // // //   // Defensive API key check matching Step 6 error handling
// // // // // //   const apiKey = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY;
// // // // // //   const [initError, setInitError] = useState(!apiKey ? 'Missing VITE_GOOGLE_AI_STUDIO_API_KEY in .env.local' : '');

// // // // // //   // Initialize the streaming client engine directly from your frontend workspace
// // // // // //   const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat({
// // // // // //     // Standard mock endpoint configuration to satisfy the hook profile requirements
// // // // // //     api: '/api/chat',
    
// // // // // //     // Custom fetch handler interceptor to process text entirely on the client-side via Google AI Studio
// // // // // //     fetch: async (url, options) => {
// // // // // //       try {
// // // // // //         const body = JSON.parse(options.body);
        
// // // // // //         const response = await google('gemini-1.5-flash', {
// // // // // //           apiKey: apiKey
// // // // // //         }).streamText({
// // // // // //           messages: body.messages,
// // // // // //           system: `You are the dedicated onboarding concierge for the florence-focus-timer app. 
// // // // // //           Your primary task is to answer inquiries on how to use the app clearly.
          
// // // // // //           App Core Rules & Specifications for Context:
// // // // // //           1. Current Goal Display: Shows the active task text, or defaults to "Maintain Beauty" if empty.
// // // // // //           2. Modes: Focus Mode (user works), Rest Mode (short break 5m, long break 15m, or continuous focus).
// // // // // //           3. Sorting Machine: Active uncompleted goals are always sorted newest-first at the very top. Checked/Completed tasks automatically drop directly underneath active tasks and sort newest-completed-first.
// // // // // //           4. Pagination: Tasks are broken up into pages containing up to 2 items per view.
// // // // // //           5. Persistence: All state data automatically backs up to local browser storage dynamically.
          
// // // // // //           Keep your tone supportive, clear, and direct. Explain features naturally if asked.`
// // // // // //         });

// // // // // //         // Pack output data into a streaming delivery block readable by useChat
// // // // // //         return response.toDataStreamResponse();
// // // // // //       } catch (err) {
// // // // // //         console.error('Core AI Stream Execution Error:', err);
// // // // // //         throw err;
// // // // // //       }
// // // // // //     },
// // // // // //     onError: (err) => {
// // // // // //       console.error('Streaming connection disrupted:', err);
// // // // // //     }
// // // // // //   });

// // // // // //   return (
// // // // // //     <div className="task-section-block" style={{ marginTop: '22px' }}>
// // // // // //       <h3>Timer Concierge AI</h3>
      
// // // // // //       {/* Step 6 Error Handling Display blocks */}
// // // // // //       {(initError || error) && (
// // // // // //         <div className="task-error-text" style={{ marginBottom: '12px' }}>
// // // // // //           ⚠️ {initError || 'Connection lost. Please verify your network or API key.'}
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <div style={{ 
// // // // // //         maxHeight: '200px', 
// // // // // //         overflowY: 'auto', 
// // // // // //         marginBottom: '14px', 
// // // // // //         display: 'flex', 
// // // // // //         flexDirection: 'column', 
// // // // // //         gap: '8px' 
// // // // // //       }}>
// // // // // //         {messages.length === 0 ? (
// // // // // //           <div className="empty-tasks-placeholder">
// // // // // //             Ask me how to configure your goals, breaks, or timer sessions!
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           messages.map(m => (
// // // // // //             <div key={m.id} style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
// // // // // //               <strong style={{ color: m.role === 'user' ? '#ff5c84' : '#4a3336' }}>
// // // // // //                 {m.role === 'user' ? 'You: ' : 'AI: '}
// // // // // //               </strong>
// // // // // //               <span style={{ color: '#5c4a4d' }}>{m.content}</span>
// // // // // //             </div>
// // // // // //           ))
// // // // // //         )}
// // // // // //         {isLoading && <div className="empty-tasks-placeholder" style={{ textAlign: 'left' }}>Typing...</div>}
// // // // // //       </div>

// // // // // //       <form 
// // // // // //         onSubmit={(e) => {
// // // // // //           e.preventDefault(); // Prevents default browser page reloads
// // // // // //           handleSubmit(e);    // Executes the streaming engine
// // // // // //         }} 
// // // // // //         className="task-form-grid" 
// // // // // //         style={{ marginBottom: 0 }}
// // // // // //       >
// // // // // //         <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
// // // // // //           <input
// // // // // //             className="task-desc-input"
// // // // // //             value={input}
// // // // // //             placeholder="Ask a question about the app..."
// // // // // //             onChange={handleInputChange}
// // // // // //             disabled={!!initError}
// // // // // //             style={{ flex: 1 }}
// // // // // //           />
// // // // // //           <button 
// // // // // //             type="submit" 
// // // // // //             className="add-task-btn" 
// // // // // //             disabled={isLoading || !!initError}
// // // // // //             style={{ minWidth: '70px' }}
// // // // // //           >
// // // // // //             Ask
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </form>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default AiAssistant;

// // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // import { google } from '@ai-sdk/google';

// // // // // function AiAssistant() {
// // // // //   const apiKey = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY;
// // // // //   const [initError] = useState(!apiKey ? 'Missing VITE_GOOGLE_AI_STUDIO_API_KEY in .env.local' : '');

// // // // //   // Core chat states to track conversations manually and bypass hidden hook layers
// // // // //   const [messages, setMessages] = useState([]);
// // // // //   const [input, setInput] = useState('');
// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const [streamError, setStreamError] = useState('');
  
// // // // //   const chatWindowRef = useRef(null);

// // // // //   // Auto-scroll chat panel downward whenever messages streaming updates layout
// // // // //   useEffect(() => {
// // // // //     if (chatWindowRef.current) {
// // // // //       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
// // // // //     }
// // // // //   }, [messages, isLoading]);

// // // // //   const handleManualSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     const cleanInput = input.trim();
// // // // //     if (!cleanInput || isLoading || !!initError) return;

// // // // //     setStreamError('');
// // // // //     setInput(''); // Clear input box instantly
// // // // //     setIsLoading(true);

// // // // //     // 1. Immediately append the user message onto the screen layout array
// // // // //     const userMessage = { id: `user-${Date.now()}`, role: 'user', content: cleanInput };
// // // // //     const updatedHistory = [...messages, userMessage];
// // // // //     setMessages(updatedHistory);

// // // // //     // 2. Prepare an empty slot placeholder object for incoming text stream segments
// // // // //     const aiMessageId = `ai-${Date.now()}`;
// // // // //     let streamedTextBuffer = '';

// // // // //     try {
// // // // //       // Establish direct frontend text streaming pipeline with Google Gemini AI Studio
// // // // //       const responseStream = await google('gemini-1.5-flash', {
// // // // //         apiKey: apiKey
// // // // //       }).streamText({
// // // // //         messages: updatedHistory.map(m => ({ role: m.role, content: m.content })),
// // // // //         system: `You are the dedicated onboarding concierge for the florence-focus-timer app. 
// // // // //         Your primary task is to answer inquiries on how to use the app clearly.
        
// // // // //         App Core Rules & Specifications for Context:
// // // // //         1. Current Goal Display: Shows the active task text, or defaults to "Maintain Beauty" if empty.
// // // // //         2. Modes: Focus Mode (user works), Rest Mode (short break 5m, long break 15m, or continuous focus).
// // // // //         3. Sorting Machine: Active uncompleted goals are always sorted newest-first at the very top. Checked/Completed tasks automatically drop directly underneath active tasks and sort newest-completed-first.
// // // // //         4. Pagination: Tasks are broken up into pages containing up to 2 items per view.
// // // // //         5. Persistence: All state data automatically backs up to local browser storage dynamically.
        
// // // // //         Keep your tone supportive, clear, and direct. Explain features naturally if asked.`
// // // // //       });

// // // // //       // 3. Incrementally consume live chunks from the macro-task stream reader
// // // // //       for await (const textPart of responseStream.textStream) {
// // // // //         streamedTextBuffer += textPart;
        
// // // // //         // Dynamically replace or update the running AI text slot array inside the loop frame
// // // // //         setMessages((prev) => {
// // // // //           const filtered = prev.filter(m => m.id !== aiMessageId);
// // // // //           return [...filtered, { id: aiMessageId, role: 'assistant', content: streamedTextBuffer }];
// // // // //         });
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error('Direct Gemini stream pipeline crashed:', err);
// // // // //       setStreamError('Connection interrupted. Please verify your internet or Google API Key.');
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="task-section-block" style={{ marginTop: '22px' }}>
// // // // //       <h3>Timer Concierge AI</h3>
      
// // // // //       {/* Error Displays */}
// // // // //       {(initError || streamError) && (
// // // // //         <div className="task-error-text" style={{ marginBottom: '12px' }}>
// // // // //           ⚠️ {initError || streamError}
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Dynamic Messages Log Board */}
// // // // //       <div 
// // // // //         ref={chatWindowRef}
// // // // //         style={{ 
// // // // //           maxHeight: '200px', 
// // // // //           overflowY: 'auto', 
// // // // //           marginBottom: '14px', 
// // // // //           display: 'flex', 
// // // // //           flexDirection: 'column', 
// // // // //           gap: '8px' 
// // // // //         }}
// // // // //       >
// // // // //         {messages.length === 0 ? (
// // // // //           <div className="empty-tasks-placeholder">
// // // // //             Ask me how to configure your goals, breaks, or timer sessions!
// // // // //           </div>
// // // // //         ) : (
// // // // //           messages.map(m => (
// // // // //             <div key={m.id} style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
// // // // //               <strong style={{ color: m.role === 'user' ? '#ff5c84' : '#4a3336' }}>
// // // // //                 {m.role === 'user' ? 'You: ' : 'AI: '}
// // // // //               </strong>
// // // // //               <span style={{ color: '#5c4a4d' }}>{m.content}</span>
// // // // //             </div>
// // // // //           ))
// // // // //         )}
// // // // //         {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
// // // // //           <div className="empty-tasks-placeholder" style={{ textAlign: 'left' }}>Thinking...</div>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* Clean Native HTML Form Layout */}
// // // // //       <form onSubmit={handleManualSubmit} className="task-form-grid" style={{ marginBottom: 0 }}>
// // // // //         <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
// // // // //           <input
// // // // //             className="task-desc-input"
// // // // //             value={input}
// // // // //             placeholder="Ask a question about the app..."
// // // // //             onChange={(e) => setInput(e.target.value)}
// // // // //             disabled={!!initError || isLoading}
// // // // //             style={{ flex: 1 }}
// // // // //           />
// // // // //           <button 
// // // // //             type="submit" 
// // // // //             className="add-task-btn" 
// // // // //             disabled={isLoading || !!initError || !input.trim()}
// // // // //             style={{ minWidth: '70px' }}
// // // // //           >
// // // // //             {isLoading ? '...' : 'Ask'}
// // // // //           </button>
// // // // //         </div>
// // // // //       </form>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default AiAssistant;



// // // // import React, { useState, useRef, useEffect } from 'react';

// // // // function AiAssistant() {
// // // //   const apiKey = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY;
// // // //   const [initError] = useState(!apiKey ? 'Missing VITE_GOOGLE_AI_STUDIO_API_KEY in .env.local' : '');

// // // //   const [messages, setMessages] = useState([]);
// // // //   const [input, setInput] = useState('');
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [streamError, setStreamError] = useState('');
  
// // // //   const chatWindowRef = useRef(null);

// // // //   useEffect(() => {
// // // //     if (chatWindowRef.current) {
// // // //       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
// // // //     }
// // // //   }, [messages, isLoading]);

// // // //   const handleManualSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     const cleanInput = input.trim();
// // // //     if (!cleanInput || isLoading || !!initError) return;

// // // //     setStreamError('');
// // // //     setInput('');
// // // //     setIsLoading(true);

// // // //     const userMessage = { id: `user-${Date.now()}`, role: 'user', content: cleanInput };
// // // //     const updatedHistory = [...messages, userMessage];
// // // //     setMessages(updatedHistory);

// // // //     const aiMessageId = `ai-${Date.now()}`;

// // // //     try {
// // // //       // Map the history array into the exact payload interface required by Google Generative AI
// // // //       const contentsPayload = updatedHistory.map(m => ({
// // // //         role: m.role === 'user' ? 'user' : 'model',
// // // //         parts: [{ text: m.content }]
// // // //       }));

// // // //       // Route through our new local proxy server to avoid CORS/Browser blocking errors
// // // //       const response = await fetch(`/api/gemini?key=${apiKey}`, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({
// // // //           contents: contentsPayload,
// // // //           systemInstruction: {
// // // //             parts: [{
// // // //               text: `You are the dedicated onboarding concierge for the florence-focus-timer app. 
// // // //               Your primary task is to answer inquiries on how to use the app clearly.
              
// // // //               App Core Rules & Specifications for Context:
// // // //               1. Current Goal Display: Shows the active task text, or defaults to "Maintain Beauty" if empty.
// // // //               2. Modes: Focus Mode (user works), Rest Mode (short break 5m, long break 15m, or continuous focus).
// // // //               3. Sorting Machine: Active uncompleted goals are always sorted newest-first at the very top. Checked/Completed tasks automatically drop directly underneath active tasks and sort newest-completed-first.
// // // //               4. Pagination: Tasks are broken up into pages containing up to 2 items per view.
// // // //               5. Persistence: All state data automatically backs up to local browser storage dynamically.`
// // // //             }]
// // // //           }
// // // //         })
// // // //       });

// // // //       if (!response.ok) throw new Error('Network proxy handshake rejected');

// // // //       const reader = response.body.getReader();
// // // //       const decoder = new TextDecoder('utf-8');
// // // //       let fullTextResponse = '';
// // // //       let buffer = '';

// // // //       // Consume stream stream text pieces
// // // //       while (true) {
// // // //         const { done, value } = await reader.read();
// // // //         if (done) break;

// // // //         buffer += decoder.decode(value, { stream: true });
        
// // // //         // Parse the raw SSE (Server-Sent Events) JSON array chunks safely
// // // //         const lines = buffer.split('\n');
// // // //         buffer = lines.pop() || ''; // Keep incomplete lines in buffer

// // // //         for (const line of lines) {
// // // //           if (line.trim().startsWith('[{') || line.trim().startsWith('{') || line.trim().startsWith(',')) {
// // // //             try {
// // // //               // Clean up framing data and extract textual segments
// // // //               const cleanLine = line.replace(/^,/, '').trim();
// // // //               const parsed = JSON.parse(cleanLine);
// // // //               const textChunk = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              
// // // //               if (textChunk) {
// // // //                 fullTextResponse += textChunk;
// // // //                 setMessages((prev) => {
// // // //                   const filtered = prev.filter(m => m.id !== aiMessageId);
// // // //                   return [...filtered, { id: aiMessageId, role: 'model', content: fullTextResponse }];
// // // //                 });
// // // //               }
// // // //             } catch (e) {
// // // //               // Skip line buffering errors during transition ticks
// // // //             }
// // // //           }
// // // //         }
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       setStreamError('Connection interrupted. Please verify your internet or Google API Key.');
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="task-section-block" style={{ marginTop: '22px' }}>
// // // //       <h3>Timer Concierge AI</h3>
      
// // // //       {(initError || streamError) && (
// // // //         <div className="task-error-text" style={{ marginBottom: '12px' }}>
// // // //           ⚠️ {initError || streamError}
// // // //         </div>
// // // //       )}

// // // //       <div 
// // // //         ref={chatWindowRef}
// // // //         style={{ 
// // // //           maxHeight: '200px', 
// // // //           overflowY: 'auto', 
// // // //           marginBottom: '14px', 
// // // //           display: 'flex', 
// // // //           flexDirection: 'column', 
// // // //           gap: '8px' 
// // // //         }}
// // // //       >
// // // //         {messages.length === 0 ? (
// // // //           <div className="empty-tasks-placeholder">
// // // //             Ask me how to configure your goals, breaks, or timer sessions!
// // // //           </div>
// // // //         ) : (
// // // //           messages.map(m => (
// // // //             <div key={m.id} style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
// // // //               <strong style={{ color: m.role === 'user' ? '#ff5c84' : '#4a3336' }}>
// // // //                 {m.role === 'user' ? 'You: ' : 'AI: '}
// // // //               </strong>
// // // //               <span style={{ color: '#5c4a4d' }}>{m.content}</span>
// // // //             </div>
// // // //           ))
// // // //         )}
// // // //         {isLoading && messages[messages.length - 1]?.role !== 'model' && (
// // // //           <div className="empty-tasks-placeholder" style={{ textAlign: 'left' }}>Thinking...</div>
// // // //         )}
// // // //       </div>

// // // //       <form onSubmit={handleManualSubmit} className="task-form-grid" style={{ marginBottom: 0 }}>
// // // //         <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
// // // //           <input
// // // //             className="task-desc-input"
// // // //             value={input}
// // // //             placeholder="Ask a question about the app..."
// // // //             onChange={(e) => setInput(e.target.value)}
// // // //             disabled={!!initError || isLoading}
// // // //             style={{ flex: 1 }}
// // // //           />
// // // //           <button 
// // // //             type="submit" 
// // // //             className="add-task-btn" 
// // // //             disabled={isLoading || !!initError || !input.trim()}
// // // //             style={{ minWidth: '70px' }}
// // // //           >
// // // //             {isLoading ? '...' : 'Ask'}
// // // //           </button>
// // // //         </div>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default AiAssistant;


// // // import React, { useState, useRef, useEffect } from 'react';

// // // function AiAssistant() {
// // //   const apiKey = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY;
// // //   const [initError] = useState(!apiKey ? 'Missing VITE_GOOGLE_AI_STUDIO_API_KEY in .env.local' : '');

// // //   const [messages, setMessages] = useState([]);
// // //   const [input, setInput] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [streamError, setStreamError] = useState('');
  
// // //   const chatWindowRef = useRef(null);

// // //   useEffect(() => {
// // //     if (chatWindowRef.current) {
// // //       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
// // //     }
// // //   }, [messages, isLoading]);

// // //   const handleManualSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const cleanInput = input.trim();
// // //     if (!cleanInput || isLoading || !!initError) return;

// // //     setStreamError('');
// // //     setInput('');
// // //     setIsLoading(true);

// // //     const userMessage = { id: `user-${Date.now()}`, role: 'user', content: cleanInput };
// // //     const updatedHistory = [...messages, userMessage];
// // //     setMessages(updatedHistory);

// // //     const aiMessageId = `ai-${Date.now()}`;

// // //     try {
// // //       // Map chat state history cleanly into the exact structure required by the Gemini API
// // //       const contentsPayload = updatedHistory.map(m => ({
// // //         role: m.role === 'user' ? 'user' : 'model',
// // //         parts: [{ text: m.content }]
// // //       }));

// // //       // Fire a post request through your local development proxy bridge to bypass CORS blocks
// // //       const response = await fetch(`/api/gemini?key=${apiKey}`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({
// // //           contents: contentsPayload,
// // //           systemInstruction: {
// // //             parts: [{
// // //               text: `You are the dedicated onboarding concierge for the florence-focus-timer app. 
// // //               Your primary task is to answer inquiries on how to use the app clearly.
              
// // //               App Core Rules & Specifications for Context:
// // //               1. Current Goal Display: Shows the active task text, or defaults to "Maintain Beauty" if empty.
// // //               2. Modes: Focus Mode (user works), Rest Mode (short break 5m, long break 15m, or continuous focus).
// // //               3. Sorting Machine: Active uncompleted goals are always sorted newest-first at the very top. Checked/Completed tasks automatically drop directly underneath active tasks and sort newest-completed-first.
// // //               4. Pagination: Tasks are broken up into pages containing up to 2 items per view.
// // //               5. Persistence: All state data automatically backs up to local browser storage dynamically.`
// // //             }]
// // //           }
// // //         })
// // //       });

// // //       if (!response.ok) throw new Error('Proxy handshake rejected by Google server');

// // //       const reader = response.body.getReader();
// // //       const decoder = new TextDecoder('utf-8');
// // //       let fullTextResponse = '';
// // //       let jsonBuffer = '';

// // //       while (true) {
// // //         const { done, value } = await reader.read();
// // //         if (done) break;

// // //         // Convert data bits into string pieces
// // //         const textChunk = decoder.decode(value, { stream: true });
// // //         jsonBuffer += textChunk;

// // //         // Process lines line-by-line as they stream from the server
// // //         const lines = jsonBuffer.split('\n');
// // //         jsonBuffer = lines.pop() || ''; // Keep incomplete trailing lines in buffer

// // //         for (const line of lines) {
// // //           let cleanLine = line.trim();
// // //           if (!cleanLine) continue;

// // //           // Strip standard streaming data frames cleanly
// // //           if (cleanLine.startsWith(',')) cleanLine = cleanLine.substring(1).trim();
// // //           if (cleanLine.startsWith('[')) cleanLine = cleanLine.substring(1).trim();
// // //           if (cleanLine.endsWith(']')) cleanLine = cleanLine.substring(0, cleanLine.length - 1).trim();
          
// // //           if (!cleanLine) continue;

// // //           try {
// // //             // Unpack the nested properties down to the generated words block safely
// // //             const parsed = JSON.parse(cleanLine);
// // //             const wordPiece = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            
// // //             if (wordPiece) {
// // //               fullTextResponse += wordPiece;
              
// // //               // Incrementally write text straight onto the visible layout screen live
// // //               setMessages((prev) => {
// // //                 const filtered = prev.filter(m => m.id !== aiMessageId);
// // //                 return [...filtered, { id: aiMessageId, role: 'model', content: fullTextResponse }];
// // //               });
// // //             }
// // //           } catch (err) {
// // //             // Keep going if a line is cut off mid-chunk during streaming transition spikes
// // //           }
// // //         }
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       setStreamError('Connection interrupted. Please verify your internet or Google API Key.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="task-section-block" style={{ marginTop: '22px' }}>
// // //       <h3>Timer Concierge AI</h3>
      
// // //       {(initError || streamError) && (
// // //         <div className="task-error-text" style={{ marginBottom: '12px' }}>
// // //           ⚠️ {initError || streamError}
// // //         </div>
// // //       )}

// // //       <div 
// // //         ref={chatWindowRef}
// // //         style={{ 
// // //           maxHeight: '200px', 
// // //           overflowY: 'auto', 
// // //           marginBottom: '14px', 
// // //           display: 'flex', 
// // //           flexDirection: 'column', 
// // //           gap: '8px' 
// // //         }}
// // //       >
// // //         {messages.length === 0 ? (
// // //           <div className="empty-tasks-placeholder">
// // //             Ask me how to configure your goals, breaks, or timer sessions!
// // //           </div>
// // //         ) : (
// // //           messages.map(m => (
// // //             <div key={m.id} style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
// // //               <strong style={{ color: m.role === 'user' ? '#ff5c84' : '#4a3336' }}>
// // //                 {m.role === 'user' ? 'You: ' : 'AI: '}
// // //               </strong>
// // //               <span style={{ color: '#5c4a4d' }}>{m.content}</span>
// // //             </div>
// // //           ))
// // //         )}
// // //         {isLoading && messages[messages.length - 1]?.role !== 'model' && (
// // //           <div className="empty-tasks-placeholder" style={{ textAlign: 'left' }}>Thinking...</div>
// // //         )}
// // //       </div>

// // //       <form onSubmit={handleManualSubmit} className="task-form-grid" style={{ marginBottom: 0 }}>
// // //         <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
// // //           <input
// // //             className="task-desc-input"
// // //             value={input}
// // //             placeholder="Ask a question about the app..."
// // //             onChange={(e) => setInput(e.target.value)}
// // //             disabled={!!initError || isLoading}
// // //             style={{ flex: 1 }}
// // //           />
// // //           <button 
// // //             type="submit" 
// // //             className="add-task-btn" 
// // //             disabled={isLoading || !!initError || !input.trim()}
// // //             style={{ minWidth: '70px' }}
// // //           >
// // //             {isLoading ? '...' : 'Ask'}
// // //           </button>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default AiAssistant;


// // import React, { useState, useRef, useEffect } from 'react';
// // import { GoogleGenAI } from '@google/generative-ai';

// // function AiAssistant() {
// //   const apiKey = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY;
// //   const [initError] = useState(!apiKey ? 'Missing VITE_GOOGLE_AI_STUDIO_API_KEY in .env.local' : '');

// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [streamError, setStreamError] = useState('');
  
// //   const chatWindowRef = useRef(null);

// //   // Auto-scroll chat panel downward as messages arrive
// //   useEffect(() => {
// //     if (chatWindowRef.current) {
// //       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
// //     }
// //   }, [messages, isLoading]);

// //   const handleManualSubmit = async (e) => {
// //     e.preventDefault();
// //     const cleanInput = input.trim();
// //     if (!cleanInput || isLoading || !!initError) return;

// //     setStreamError('');
// //     setInput('');
// //     setIsLoading(true);

// //     // Append user query onto the screen
// //     const userMessage = { id: `user-${Date.now()}`, role: 'user', content: cleanInput };
// //     const updatedHistory = [...messages, userMessage];
// //     setMessages(updatedHistory);

// //     const aiMessageId = `ai-${Date.now()}`;
// //     let fullTextResponse = '';

// //     try {
// //       // 1. Initialize the official Google Gen AI Client SDK
// //       const ai = new GoogleGenAI({ apiKey: apiKey });

// //       // 2. Format chat logs into standard system objects
// //       const contentsPayload = updatedHistory.map(m => ({
// //         role: m.role === 'user' ? 'user' : 'model',
// //         parts: [{ text: m.content }]
// //       }));

// //       // 3. Initiate direct browser streaming using the official optimized model endpoint
// //       const responseStream = await ai.models.generateContentStream({
// //         model: 'gemini-1.5-flash',
// //         contents: contentsPayload,
// //         config: {
// //           systemInstruction: `You are the dedicated onboarding concierge for the florence-focus-timer app. 
// //           Your primary task is to answer inquiries on how to use the app clearly.
          
// //           App Core Rules & Specifications for Context:
// //           1. Current Goal Display: Shows the active task text, or defaults to "Maintain Beauty" if empty.
// //           2. Modes: Focus Mode (user works), Rest Mode (short break 5m, long break 15m, or continuous focus).
// //           3. Sorting Machine: Active uncompleted goals are always sorted newest-first at the very top. Checked/Completed tasks automatically drop directly underneath active tasks and sort newest-completed-first.
// //           4. Pagination: Tasks are broken up into pages containing up to 2 items per view.
// //           5. Persistence: All state data automatically backs up to local browser storage dynamically.`
// //         }
// //       });

// //       // 4. Clean loop that safely outputs chunk parts without manually cracking JSON strings
// //       for await (const chunk of responseStream) {
// //         const textChunk = chunk.text;
// //         if (textChunk) {
// //           fullTextResponse += textChunk;
// //           setMessages((prev) => {
// //             const filtered = prev.filter(m => m.id !== aiMessageId);
// //             return [...filtered, { id: aiMessageId, role: 'model', content: fullTextResponse }];
// //           });
// //         }
// //       }
// //     } catch (err) {
// //       console.error('Google Client API Error:', err);
// //       setStreamError('Connection interrupted. Please verify your internet or Google API Key.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="task-section-block" style={{ marginTop: '22px' }}>
// //       <h3>Timer Concierge AI</h3>
      
// //       {(initError || streamError) && (
// //         <div className="task-error-text" style={{ marginBottom: '12px' }}>
// //           ⚠️ {initError || streamError}
// //         </div>
// //       )}

// //       <div 
// //         ref={chatWindowRef}
// //         style={{ 
// //           maxHeight: '200px', 
// //           overflowY: 'auto', 
// //           marginBottom: '14px', 
// //           display: 'flex', 
// //           flexDirection: 'column', 
// //           gap: '8px' 
// //         }}
// //       >
// //         {messages.length === 0 ? (
// //           <div className="empty-tasks-placeholder">
// //             Ask me how to configure your goals, breaks, or timer sessions!
// //           </div>
// //         ) : (
// //           messages.map(m => (
// //             <div key={m.id} style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
// //               <strong style={{ color: m.role === 'user' ? '#ff5c84' : '#4a3336' }}>
// //                 {m.role === 'user' ? 'You: ' : 'AI: '}
// //               </strong>
// //               <span style={{ color: '#5c4a4d' }}>{m.content}</span>
// //             </div>
// //           ))
// //         )}
// //         {isLoading && messages[messages.length - 1]?.role !== 'model' && (
// //           <div className="empty-tasks-placeholder" style={{ textAlign: 'left' }}>Thinking...</div>
// //         )}
// //       </div>

// //       <form onSubmit={handleManualSubmit} className="task-form-grid" style={{ marginBottom: 0 }}>
// //         <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
// //           <input
// //             className="task-desc-input"
// //             value={input}
// //             placeholder="Ask a question about the app..."
// //             onChange={(e) => setInput(e.target.value)}
// //             disabled={!!initError || isLoading}
// //             style={{ flex: 1 }}
// //           />
// //           <button 
// //             type="submit" 
// //             className="add-task-btn" 
// //             disabled={isLoading || !!initError || !input.trim()}
// //             style={{ minWidth: '70px' }}
// //           >
// //             {isLoading ? '...' : 'Ask'}
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default AiAssistant;

// import React, { useState, useRef, useEffect } from 'react';
// import { GoogleGenerativeAI } from '@google/generative-ai'; // 👈 Fixed class import name

// function AiAssistant() {
//   const apiKey = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY;
//   const [initError] = useState(!apiKey ? 'Missing VITE_GOOGLE_AI_STUDIO_API_KEY in .env.local' : '');

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [streamError, setStreamError] = useState('');
  
//   const chatWindowRef = useRef(null);

//   useEffect(() => {
//     if (chatWindowRef.current) {
//       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
//     }
//   }, [messages, isLoading]);

//   const handleManualSubmit = async (e) => {
//     e.preventDefault();
//     const cleanInput = input.trim();
//     if (!cleanInput || isLoading || !!initError) return;

//     setStreamError('');
//     setInput('');
//     setIsLoading(true);

//     const userMessage = { id: `user-${Date.now()}`, role: 'user', content: cleanInput };
//     const updatedHistory = [...messages, userMessage];
//     setMessages(updatedHistory);

//     const aiMessageId = `ai-${Date.now()}`;
//     let fullTextResponse = '';

//     try {
//       // 1. Initialize the correct instance class matching your npm install package
//       const genAI = new GoogleGenerativeAI(apiKey);
      
//       // 2. Access the fast text-generation model engine
//       const model = genAI.getGenerativeModel({ 
//         model: 'gemini-1.5-flash',
//         systemInstruction: `You are the dedicated onboarding concierge for the florence-focus-timer app. 
//         Your primary task is to answer inquiries on how to use the app clearly.
        
//         App Core Rules & Specifications for Context:
//         1. Current Goal Display: Shows the active task text, or defaults to "Maintain Beauty" if empty.
//         2. Modes: Focus Mode (user works), Rest Mode (short break 5m, long break 15m, or continuous focus).
//         3. Sorting Machine: Active uncompleted goals are always sorted newest-first at the very top. Checked/Completed tasks automatically drop directly underneath active tasks and sort newest-completed-first.
//         4. Pagination: Tasks are broken up into pages containing up to 2 items per view.
//         5. Persistence: All state data automatically backs up to local browser storage dynamically.`
//       });

//       // 3. Format previous dialogue messages into format logs Google accepts
//       const contentsPayload = updatedHistory.map(m => ({
//         role: m.role === 'user' ? 'user' : 'model',
//         parts: [{ text: m.content }]
//       }));

//       // 4. Fire the streaming generator directly
//       const resultStream = await model.generateContentStream({
//         contents: contentsPayload
//       });

//       // 5. Read chunks cleanly as they arrive from the cloud
//       for await (const chunk of resultStream.stream) {
//         const textChunk = chunk.text();
//         if (textChunk) {
//           fullTextResponse += textChunk;
//           setMessages((prev) => {
//             const filtered = prev.filter(m => m.id !== aiMessageId);
//             return [...filtered, { id: aiMessageId, role: 'model', content: fullTextResponse }];
//           });
//         }
//       }
//     } catch (err) {
//       console.error('Google Client SDK Error:', err);
//       setStreamError('Connection interrupted. Please verify your internet or Google API Key.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="task-section-block" style={{ marginTop: '22px' }}>
//       <h3>Timer Concierge AI</h3>
      
//       {(initError || streamError) && (
//         <div className="task-error-text" style={{ marginBottom: '12px' }}>
//           ⚠️ {initError || streamError}
//         </div>
//       )}

//       <div 
//         ref={chatWindowRef}
//         style={{ 
//           maxHeight: '200px', 
//           overflowY: 'auto', 
//           marginBottom: '14px', 
//           display: 'flex', 
//           flexDirection: 'column', 
//           gap: '8px' 
//         }}
//       >
//         {messages.length === 0 ? (
//           <div className="empty-tasks-placeholder">
//             Ask me how to configure your goals, breaks, or timer sessions!
//           </div>
//         ) : (
//           messages.map(m => (
//             <div key={m.id} style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
//               <strong style={{ color: m.role === 'user' ? '#ff5c84' : '#4a3336' }}>
//                 {m.role === 'user' ? 'You: ' : 'AI: '}
//               </strong>
//               <span style={{ color: '#5c4a4d' }}>{m.content}</span>
//             </div>
//           ))
//         )}
//         {isLoading && messages[messages.length - 1]?.role !== 'model' && (
//           <div className="empty-tasks-placeholder" style={{ textAlign: 'left' }}>Thinking...</div>
//         )}
//       </div>

//       <form onSubmit={handleManualSubmit} className="task-form-grid" style={{ marginBottom: 0 }}>
//         <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
//           <input
//             className="task-desc-input"
//             value={input}
//             placeholder="Ask a question about the app..."
//             onChange={(e) => setInput(e.target.value)}
//             disabled={!!initError || isLoading}
//             style={{ flex: 1 }}
//           />
//           <button 
//             type="submit" 
//             className="add-task-btn" 
//             disabled={isLoading || !!initError || !input.trim()}
//             style={{ minWidth: '70px' }}
//           >
//             {isLoading ? '...' : 'Ask'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AiAssistant;

import React, { useState, useRef, useEffect } from 'react';

function AiAssistant() {
  const apiKey = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY;
  const [initError] = useState(!apiKey ? 'Missing VITE_GOOGLE_AI_STUDIO_API_KEY in .env.local' : '');

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamError, setStreamError] = useState('');
  
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const cleanInput = input.trim();
    if (!cleanInput || isLoading || !!initError) return;

    setStreamError('');
    setInput('');
    setIsLoading(true);

    const userMessage = { id: `user-${Date.now()}`, role: 'user', content: cleanInput };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);

    const aiMessageId = `ai-${Date.now()}`;
    let fullTextResponse = '';

    try {
      // 1. Format conversation history into standard system blocks for the model payload
      const contentsPayload = updatedHistory.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      // 2. Point to the local Vite proxy path instead of calling Google's URL directly to stop CORS blocking
      // const response = await fetch(`/api/gemini?key=${apiKey}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     contents: contentsPayload,
      //     systemInstruction: {
      //       parts: [{
      //         text: `You are the dedicated onboarding concierge for the florence-focus-timer app. 
      //         Your primary task is to answer inquiries on how to use the app clearly.
              
      //         App Core Rules & Specifications for Context:
      //         1. Current Goal Display: Shows the active task text, or defaults to "Maintain Beauty" if empty.
      //         2. Modes: Focus Mode (user works), Rest Mode (short break 5m, long break 15m, or continuous focus).
      //         3. Sorting Machine: Active uncompleted goals are always sorted newest-first at the very top. Checked/Completed tasks automatically drop directly underneath active tasks and sort newest-completed-first.
      //         4. Pagination: Tasks are broken up into pages containing up to 2 items per view.
      //         5. Persistence: All state data automatically backs up to local browser storage dynamically.`
      //       }]
      //     }
      //   })
      // });


      // Find this exact fetch line inside handleManualSubmit:
const response = await fetch(`/api/gemini?key=${apiKey}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: contentsPayload,
    systemInstruction: {
      parts: [{
        text: `You are the dedicated onboarding concierge for the florence-focus-timer app...`
      }]
    }
  })
});

      if (!response.ok) throw new Error('Handshake rejected by endpoint routing');

      // 3. Process the incoming streaming chunks using standard browser streams
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          
          // Clean up individual server stream blocks to find message text strings safely
          const jsonLines = chunk.split('\n');
          for (let line of jsonLines) {
            let cleanLine = line.trim();
            if (!cleanLine) continue;

            // Strip out API packet characters cleanly
            if (cleanLine.startsWith(',')) cleanLine = cleanLine.substring(1).trim();
            if (cleanLine.startsWith('[')) cleanLine = cleanLine.substring(1).trim();
            if (cleanLine.endsWith(']')) cleanLine = cleanLine.substring(0, cleanLine.length - 1).trim();

            try {
              const parsed = JSON.parse(cleanLine);
              const extractedText = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (extractedText) {
                fullTextResponse += extractedText;
                
                // Stream text directly into the conversation layout frame view
                setMessages((prev) => {
                  const filtered = prev.filter(m => m.id !== aiMessageId);
                  return [...filtered, { id: aiMessageId, role: 'model', content: fullTextResponse }];
                });
              }
            } catch (e) {
              // Gracefully handle partial text lines while streaming data frames
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
      setStreamError('Connection interrupted. Please verify your internet or Google API Key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="task-section-block" style={{ marginTop: '22px' }}>
      <h3>Timer Concierge AI</h3>
      
      {(initError || streamError) && (
        <div className="task-error-text" style={{ marginBottom: '12px' }}>
          ⚠️ {initError || streamError}
        </div>
      )}

      <div 
        ref={chatWindowRef}
        style={{ 
          maxHeight: '200px', 
          overflowY: 'auto', 
          marginBottom: '14px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px' 
        }}
      >
        {messages.length === 0 ? (
          <div className="empty-tasks-placeholder">
            Ask me how to configure your goals, breaks, or timer sessions!
          </div>
        ) : (
          messages.map(m => (
            <div key={m.id} style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
              <strong style={{ color: m.role === 'user' ? '#ff5c84' : '#4a3336' }}>
                {m.role === 'user' ? 'You: ' : 'AI: '}
              </strong>
              <span style={{ color: '#5c4a4d' }}>{m.content}</span>
            </div>
          ))
        )}
        {isLoading && messages[messages.length - 1]?.role !== 'model' && (
          <div className="empty-tasks-placeholder" style={{ textAlign: 'left' }}>Thinking...</div>
        )}
      </div>

      <form onSubmit={handleManualSubmit} className="task-form-grid" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
          <input
            className="task-desc-input"
            value={input}
            placeholder="Ask a question about the app..."
            onChange={(e) => setInput(e.target.value)}
            disabled={!!initError || isLoading}
            style={{ flex: 1 }}
          />
          <button 
            type="submit" 
            className="add-task-btn" 
            disabled={isLoading || !!initError || !input.trim()}
            style={{ minWidth: '70px' }}
          >
            {isLoading ? '...' : 'Ask'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AiAssistant;
