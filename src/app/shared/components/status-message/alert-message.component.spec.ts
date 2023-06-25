import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessageComponent } from './alert-message.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AlertMessageComponent', () => {
  let component: AlertMessageComponent;
  let fixture: ComponentFixture<AlertMessageComponent>;

  function getButtonElem(): HTMLButtonElement {
    return fixture.debugElement.query(By.css('[data-testid=button]'))
      .nativeElement as HTMLButtonElement;
  }

  function getIconElem(): DebugElement {
    return fixture.debugElement.query(By.css('[data-testid=icon]'));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertMessageComponent],
    });
    fixture = TestBed.createComponent(AlertMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the given title', () => {
    const title = 'Test title';
    component.title = title;
    fixture.detectChanges();

    expect(
      (
        fixture.debugElement.query(By.css('[data-testid=title]'))
          .nativeElement as HTMLElement
      ).textContent?.trim()
    ).toEqual(title);
  });

  describe('should show the correct icon', () => {
    it('should show the check icon when input equals "check-circle"', () => {
      component.icon = 'check-circle';
      fixture.detectChanges();

      expect(getIconElem()).toBeTruthy();
      expect(
        getIconElem().query(By.css('use')).attributes['xlink:href']
      ).toEqual('/assets/icons/check-circle.svg#check-circle');
    });

    it('should show the exclamation circle icon when input equals "exclamation-circle"', () => {
      component.icon = 'exclamation-circle';
      fixture.detectChanges();

      expect(getIconElem()).toBeTruthy();
      expect(
        getIconElem().query(By.css('use')).attributes['xlink:href']
      ).toEqual('/assets/icons/exclamation-circle.svg#exclamation-circle');
    });

    it('should show no icon when icon not set', () => {
      expect(getIconElem()).toBeNull();
    });
  });

  it('should show the given message', () => {
    const message = 'Test message';
    component.message = message;
    fixture.detectChanges();

    expect(
      (
        fixture.debugElement.query(By.css('[data-testid=message]'))
          .nativeElement as HTMLElement
      ).textContent?.trim()
    ).toEqual(message);
  });

  it('should show the given button text', () => {
    const buttonText = 'Test message';
    component.buttonText = buttonText;
    fixture.detectChanges();

    expect(getButtonElem().textContent?.trim()).toEqual(buttonText);
  });

  it('should call the buttonClick event when button clicked', () => {
    spyOn(component.buttonClick, 'emit');

    getButtonElem().click();

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });
});
