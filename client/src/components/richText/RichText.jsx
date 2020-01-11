import React, { Component } from "react";
import BreadcrumbCustom from "../common/BreadcrumbCustom";
import { Row, Col, Button, notification } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import "./github-markdown.css";

export default class RichText extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      html: "<div><h1>富文本编辑</h1>"
    };
  }

  handleEditorChange = html => {
    console.log(html);
    this.setState({ html });
  };

  copyHtml = () => {
    const { html } = this.state;
    const textField = document.createElement("textarea");
    textField.innerText = html;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    notification.success({
      message: "复制成功",
      description: ""
    });
  };

  render() {
    const { html } = this.state;
    return (
      <div>
        <BreadcrumbCustom paths={["首页", "富文本"]} />
        <Button
          type={"primary"}
          onClick={this.copyHtml}
          style={{ marginBottom: 8 }}
        >
          复制html
        </Button>
        <Row gutter={16}>
          <Col md={12}>
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              className="markdown-body"
              style={{
                minHeight: 400,
                padding: 10,
                boxShadow: "0 1px 6px #ccc",
                background: "#fff"
              }}
            />
          </Col>
          <Col md={12} style={{ marginBottom: 20 }}>
            <Editor
              apiKey="vllql17719yol7wzs2jfv3c15hchg5efq6z3vp7rufn6jgqh"
              initialValue={html}
              init={{
                branding: false, //This option allows you to disable the "Powered by TinyMCE" branding.
                menubar: "edit insert format table tools",
                height: 300,
                body_class: "markdown-body",
                plugins:
                  "image imagetools advlist code media link colorpicker paste table textcolor",
                toolbar:
                  "undo redo | fontselect fontsizeselect | bold italic underline strikethrough | forecolor backcolor | bullist numlist | link image",
                selector: "textarea"
                // paste_data_images: true,
                // images_upload_handler: this.handleImagesUpload,
              }}
              onEditorChange={this.handleEditorChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
