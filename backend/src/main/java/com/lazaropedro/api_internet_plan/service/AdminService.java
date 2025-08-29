package com.lazaropedro.api_internet_plan.service;

import com.lazaropedro.api_internet_plan.dto.AuthRequest;
import com.lazaropedro.api_internet_plan.dto.AuthResponse;
import com.lazaropedro.api_internet_plan.model.Admin;
import com.lazaropedro.api_internet_plan.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(AuthRequest request) {
        Admin admin = new Admin();
        admin.setUsername(request.getUsername());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        adminRepository.save(admin);
        var jwtToken = jwtService.generateToken(admin);
        return new AuthResponse(jwtToken);
    }

    public AuthResponse authenticate(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

                var admin = (UserDetails) authentication.getPrincipal();

        var jwtToken = jwtService.generateToken(admin);

        return new AuthResponse(jwtToken);
}}
