import React from 'react';
import { render, screen } from '@testing-library/react';
import Solver from '../Pages/Solver';


class FileReaderMock {
    DONE = FileReader.DONE;
    EMPTY = FileReader.EMPTY;
    LOADING = FileReader.LOADING;
    readyState = 0;
    error: FileReader['error'] = null;
    result: FileReader['result'] = null;
    abort = jest.fn();
    addEventListener = jest.fn();
    dispatchEvent = jest.fn();
    onabort = jest.fn();
    onerror = jest.fn();
    onload = jest.fn();
    onloadend = jest.fn();
    onloadprogress = jest.fn();
    onloadstart = jest.fn();
    onprogress = jest.fn();
    readAsArrayBuffer = jest.fn();
    readAsBinaryString = jest.fn();
    readAsDataURL = jest.fn();
    readAsText = jest.fn();
    removeEventListener = jest.fn();
  }
  
  describe('load()', () =>{
    const file = new File([new ArrayBuffer(1)], 'file.JSON');
    const fileReader = new FileReaderMock();
    jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);
  
    beforeEach(() => {
        jest.clearAllMocks();  
    });
  
    it('should parse file as Exercises', async() => {
      fileReader.result = "Not correct Json"
      
    });
  
    it('should loads incorrectly', () => {
  
    });
  });