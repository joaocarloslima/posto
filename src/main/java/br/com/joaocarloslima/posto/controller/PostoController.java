package br.com.joaocarloslima.posto.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PostoController {

    @GetMapping
    public String index() {
        return "index";
    }
}
