// {toastObj.length > 0 && (
//   <div
//       aria-live="polite"
//       aria-atomic="true"
//       style={{
//           position: "relative",
//           minHeight: "200px",
//       }}
//   >
//       <div
//           style={{
//               position: "absolute",
//               top: 0,
//               right: 0,
//           }}
//       >
//           {toastObj.map((t, idx) => (
//               <Toast
//                   key={idx}
//                   onClose={this.setShowToast.bind(
//                       this,
//                       t.id
//                   )}
//                   show={true}
//                   delay={3000}
//                   autohide
//               >
//                   <Toast.Header>
//                       <img
//                           src={avatar}
//                           width={20}
//                           height={20}
//                           className="rounded mr-2"
//                           alt="Avatar"
//                       />
//                       <strong className="mr-auto">
//                           {t.header}
//                       </strong>
//                   </Toast.Header>
//                   <Toast.Body>{t.body}</Toast.Body>
//               </Toast>
//           ))}
//       </div>
//   </div>
// )}
