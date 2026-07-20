package com.cognizant.springlearn.service;

import com.cognizant.springlearn.Country;
import org.springframework.stereotype.Service;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import java.util.stream.Collectors;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    public Country getCountry(String code) {
        try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("country.xml")) {
            List<?> raw = context.getBean("countries", List.class);
            List<Country> countries = raw.stream()
                .filter(Country.class::isInstance)
                .map(Country.class::cast)
                .collect(Collectors.toList());

            Optional<Country> country = countries.stream()
                .filter(c -> c.getCode() != null && c.getCode().equalsIgnoreCase(code))
                .findFirst();

            return country.orElse(null);
        }
    }
}
