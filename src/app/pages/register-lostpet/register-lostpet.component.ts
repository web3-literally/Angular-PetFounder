/// <reference types="@types/googlemaps" />
import {Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import {MatStepper} from '@angular/material';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {MatSnackBar} from '@angular/material';

import {AppService} from 'src/app/app.service';
import {PetService} from '../../services/pet/pet.service';

@Component({
    selector: 'app-register-lostpet',
    templateUrl: './register-lostpet.component.html',
    styleUrls: ['./register-lostpet.component.scss']
})
export class RegisterLostPetComponent implements OnInit {
    @ViewChild('horizontalStepper', {static: true}) horizontalStepper: MatStepper;
    @ViewChild('addressAutocomplete', {static: false}) addressAutocomplete: ElementRef;
    public submitForm: FormGroup;

    public petTypes = [];
    public desexeds = [];
    public breeds = [];
    public colours = [];
    public ageUnits = [];
    public genders = [];
    public sizes = [];
    public microchippeds = [];

    public lat = 40.678178;
    public lng = -73.944158;
    public zoom = 12;

    constructor(public appService: AppService,
                private fb: FormBuilder,
                private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,
                private petService: PetService,
                public snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.petTypes = this.appService.getPetTypes();
        this.desexeds = this.appService.getDesexeds();
        this.breeds = this.appService.getBreeds();
        this.colours = this.appService.getColours();
        this.ageUnits = this.appService.getAgeUnits();
        this.sizes = this.appService.getSizes();
        this.genders = this.appService.getGenders();
        this.microchippeds = this.appService.getMicrochippeds();


        this.submitForm = this.fb.group({
            details: this.fb.group({
                petName: [null, Validators.required],
                collarTagDescription: [null, Validators.required],
                petType: [null, Validators.required],
                desexed: [null, Validators.required],
                breed: [null, Validators.required],
                colour: [null, Validators.required],
                age: [null, Validators.required],
                ageUnit: [null, Validators.required],
                size: [null, Validators.required],
                gender: [null, Validators.required],
                microchipped: [null, Validators.required],
                microchipNumber: [null, Validators.required],
                reward: [null, Validators.required],
                dateMissing: [null, Validators.required],
                desc: null,
                gallery: [null, Validators.required],
            }),
            address: this.fb.group({
                location: ['', Validators.required],
            }),
        });

        this.setCurrentPosition();
        this.placesAutocomplete();
    }


    public onSelectionChange(e: any) {
        if (e.selectedIndex == 1) {
            this.horizontalStepper._steps.forEach(step => step.editable = false);
            // console.log(this.submitForm.value);
        }
    }

    public postLostPet() {
        const petInfo = {
            petName: this.submitForm.value.details.petName,
            collarTagDescription: this.submitForm.value.details.collarTagDescription,
            petType: this.submitForm.value.details.petType,
            desexed: this.submitForm.value.details.desexed,
            breed: this.submitForm.value.details.breed,
            colour: this.submitForm.value.details.colour,
            age: this.submitForm.value.details.age,
            ageUnit: this.submitForm.value.details.ageUnit,
            size: this.submitForm.value.details.size,
            gender: this.submitForm.value.details.gender,
            microchipped: this.submitForm.value.details.microchipped,
            microchipNumber: this.submitForm.value.details.microchipNumber,
            reward: this.submitForm.value.details.reward,
            dateMissing: this.submitForm.value.details.dateMissing,
            desc: this.submitForm.value.details.desc,
            gallery: this.submitForm.value.details.gallery,

            lat: this.lat,
            lng: this.lng,
            location: this.submitForm.value.address.location,
        };

        // console.log(petInfo);

        this.petService.registerLostPet(petInfo).subscribe(reply => {
            try {
                if (reply.data.status == 'success') {
                    this.snackBar.open('Lost Pet Registered Successfully!', '×', {
                        panelClass: 'success',
                        verticalPosition: 'top',
                        duration: 3000
                    });
                    this.horizontalStepper.reset();
                    this.submitForm.reset({});
                } else {
                    this.snackBar.open('Lost Pet Register Failed!', '×', {panelClass: 'failed', verticalPosition: 'top', duration: 3000});
                }
            } catch (e) {
                this.snackBar.open('Lost Pet Register Failed!', '×', {panelClass: 'failed', verticalPosition: 'top', duration: 3000});
            }
        });
    }


    // -------------------- Address ---------------------------
    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            });
        }
    }

    private placesAutocomplete() {
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.addressAutocomplete.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    this.getAddress();
                });
            });
        });
    }

    // public getAddress(){
    //   this.mapsAPILoader.load().then(() => {
    //     let geocoder = new google.maps.Geocoder();
    //     let latlng = new google.maps.LatLng(this.lat, this.lng);
    //     geocoder.geocode({'location': latlng}, (results, status) => {
    //       if(status === google.maps.GeocoderStatus.OK) {
    //         console.log(results);
    //         //this.addresstext.nativeElement.focus();
    //         let address = results[0].formatted_address;
    //         this.addressForm.controls.location.setValue(address);
    //         this.setAddresses(results[0]);
    //       }
    //     });
    //   });
    // }
    public getAddress() {
        this.submitForm.controls.address.get('location').setValue('New York HimiKil City 003');
        // this.appService.getAddress(this.lat, this.lng).subscribe(response => {
        //   let address = response['results'][0].formatted_address;
        //   this.submitForm.controls.address.get('location').setValue(address);
        //   this.setAddresses(response['results'][0]);
        // })
    }

    public onMapClick(e: any) {
        // console.log(e);
        this.lat = e.coords.lat;
        this.lng = e.coords.lng;
        this.getAddress();
    }

    public onMarkerDragEnd(e: any) {
        // console.log(e);
        this.lat = e.coords.lat;
        this.lng = e.coords.lng;
        this.getAddress();
    }

    public setAddresses(result) {
    }
}
