package com.cognizant.springlearn.service;

import com.cognizant.springlearn.Country;
import org.springframework.stereotype.Service;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    public Country getCountry(String code) {
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        List<Country> countries = (List<Country>) context.getBean("countries");

        Optional<Country> country = countries.stream()
                .filter(c -> c.getCode() != null && c.getCode().equalsIgnoreCase(code))
                .findFirst();

        return country.orElse(null);
    }
}
