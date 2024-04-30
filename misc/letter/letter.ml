let rec replicate (s : string) (n : int) : string list =
  if n == 0 then [] else s :: (replicate s (n-1))

let read_file (f : string) : string =
    let ch = open_in_bin f in
    let s = really_input_string ch (in_channel_length ch) in
    close_in ch;
    s

let () =
  Dream.run ~interface:"0.0.0.0" ~port:8080
  @@ Dream.logger
  @@ Dream.memory_sessions
  @@ Dream.router [

    Dream.get  "/"
      (fun request ->
        Dream.html (Index.show request));

    Dream.post "/"
      (fun request ->
        match%lwt Dream.form ~csrf:false request with
        | `Ok gift_params ->
          let gifts = List.map (fun (_, gift) -> Printf.sprintf "'%s'" gift) gift_params in
          let md_file = Filename.temp_file "input" ".md" in
          let pdf_file = Filename.temp_file "output" ".pdf" in
          let command = String.concat " " (["./letter.sh"; md_file; pdf_file] @ gifts) in
          let result = Unix.system command in
          Unix.unlink md_file;
          begin match result with
          | WEXITED 0 ->
            Dream.stream (fun stream ->
                let pdf_content = read_file pdf_file in
                Unix.unlink pdf_file;
                Dream.write stream pdf_content
                )
          | _ -> Dream.html ~status:`Internal_Server_Error "Error when generating the letter, sorry!"
          end
        | _ -> Dream.html ~status:`Bad_Request "Bad request");
  ]
